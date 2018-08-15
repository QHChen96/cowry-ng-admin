import { Injectable, inject, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { registerLocaleData } from '@angular/common';

import { en_US, zh_CN, NzI18nService, NZ_I18N } from 'ng-zorro-antd';
import en from '@angular/common/locales/en';
import * as df_en from 'date-fns/locale/en';
import * as df_zh_cn from 'date-fns/locale/zh_cn';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class I18NService {
  private _default = 'zh-CN';
  private change$ = new BehaviorSubject<string>(null);

  private _langs = [
    { code: 'en', text: 'English' },
    { code: 'zh-CN', text: '中文' }
  ];

  constructor(
    private nzI18nService: NzI18nService,
    private translate: TranslateService,
    private injector: Injector
  ) {
    const defaultLan = 'zh-CN';
    const lans = this._langs.map(item => item.code);
    this._default = lans.includes(defaultLan) ? defaultLan : lans[0];
    translate.addLangs(lans);
    this.setZorro(this._default).setDateFns(this._default);
  }

  setZorro(lang: string): this {
    this.nzI18nService.setLocale(lang === 'en' ? en_US : zh_CN);
    return this;
  }

  setDateFns(lang: string): this {
    (window as any).__local__ = lang === 'en' ? df_en : df_zh_cn;
    return this;    
  }

  get change(): Observable<String> {
    return this.change$.asObservable().pipe(filter(w => w != null));
  }

  use(lang: string): void {
    lang = lang || this.translate.getDefaultLang();
    if (this.currentLang === lang) return;
    this.setZorro(lang).setDateFns(lang);
    this.translate.use(lang).subscribe(() => this.change$.next(lang))
  }

  getLangs() {
    return this._langs;
  }

  fanyi(key: string) {
    return this.translate.instant(key);
  }

  get defaultLang() {
    return this._default;
  }

  get currentLang() {
    return (
      this.translate.currentLang || 
      this.translate.getDefaultLang() ||
      this._default
    );
  }
}

