import { Injectable, Inject, Optional, OnDestroy } from '@angular/core';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { share } from 'rxjs/operators';

import { COWRY_I18N_TOKEN, CowryI18NService } from '@service/i18n/i18n';
import { Menu } from './interface';
import { visitAll } from '@angular/compiler/src/render3/r3_ast';
import { callbackify } from 'util';

@Injectable()
export class MenuService implements OnDestroy {
  private _change$: BehaviorSubject<Menu[]> = new BehaviorSubject<Menu[]>([]);
  private i18n$: Subscription;

  private data: Menu[] = [];

  constructor(
    @Optional()
    @Inject(COWRY_I18N_TOKEN)
    private i18nSrv: CowryI18NService,
  ) {
    if (this.i18nSrv) {
      this.i18n$ = this.i18nSrv.change.subscribe(() => this.resume());
    }
  }

  get change(): Observable<Menu[]> {
    return this._change$.pipe(share());
  }

  visit(callback: (item: Menu, parentMenum: Menu, depth?: number) => void) {
    const inFn = (list: Menu[], parentMenu: Menu, depth: number) => {
      for (const item of list) {
        callback(item, parentMenu, depth);
        if (item.children && item.children.length > 0) {
          inFn(item.children, item, depth + 1);
        } else {
          item.children = [];
        }
      }
    };
    inFn(this.data, null, 0);
  }

  add(items: Menu[]) {
    this.data = items;
    this.resume();
  }

  resume(callback?: (item: Menu, parentMenu: Menu, depth?: number) => void) {
    let i = 1;
    const shortcuts: Menu[] = [];
    this.visit((item, parent, depth) => {
      item.__id = i++;
      item.__parent = parent;
      item._depth = depth;
      
      if (!item.link) item.link = '';
      if (typeof item.linkExact === 'undefined') item.linkExact = false;
      if (!item.externalLink) item.externalLink = '';

      if (item.badge) {
        if (item.badge_dot !== true) {
          item.badge_dot = false;
        }
        if (!item.badge_status) {
          item.badge_status = 'error';
        }
      }

      item._type = item.externalLink ? 2 : 1;
      if (item.children && item.children.length > 0) {
        item._type = 3;
      }

      if (parent && item.shortcut === true && parent.shortcut_root !== true)
        shortcuts.push(item);
      
      item.text = item.i18n && this.i18nSrv ? this.i18nSrv.fanyi(item.i18n) : item.text;

      item._hidden = typeof item.hide === 'undefined' ? false : item.hide;

      // acl

      if (callback) callback(item, parent, depth);
    });

    this.loadShortcut(shortcuts);
    this._change$.next(this.data);
  }

  private loadShortcut(shortcuts: Menu[]) {
    if (shortcuts.length === 0 || this.data.length === 0) {
      return;
    }

    const ls = this.data[0].children;
    let pos = ls.findIndex(w => w.shortcut_root === true);
    if (pos === -1) {
      pos = ls.findIndex(w => w.link.includes('dashboard'));
      pos = (pos !== -1 ? pos : -1) + 1;
      const shortcutMenu = <Menu>{
        text: '快捷菜单',
        i18n: 'shortcut',
        icon: 'icon-rocket',
        children: []
      };
      this.data[0].children.splice(pos, 0, shortcutMenu);
    }
    let _data = this.data[0].children[pos];
    if (_data.i18n && this.i18nSrv)
      _data.text = this.i18nSrv.fanyi(_data.i18n);
    _data = Object.assign(_data, {
      shortcut_root: true,
      _type: 3,
      __id: -1,
      _depth: 1
    });
    _data.children = shortcuts.map(i => {
      i._depth = 2;
      return i;
    });
  }

  get menus() {
    return this.data;
  }

  clear() {
    this.data = [];
    this._change$.next(this.data);
  }

  openedByUrl(url: string) {
    if (!url) return;

    let findItem: Menu = null;
    this.visit(item => {
      item._open = false;
      if (!item.link) {
        return;
      }
      if (!findItem && url.startsWith(item.link)) {
        findItem = item;
      }
    });
    if (!findItem) return;

    do {
      findItem._open = true;
      findItem = findItem.__parent;
    } while(findItem);
  }

  getPathByUrl(url: string): Menu[] {
    let item: Menu = null;
    this.visit((i, parent, depth) => {
      if (i.link == url) {
        item = i;
      }
    });
    const ret: Menu[] = [];
    if (!item) return ret;

    do {
      ret.splice(0, 0, item);
      item = item.__paren
    } while(item);
    return ret;
  }

  ngOnDestroy(): void {
    this._change$.unsubscribe();
    if (this.i18n$) this.i18n$.unsubscribe();
  }
}