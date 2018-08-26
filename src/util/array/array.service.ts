import { Injectable } from '@angular/core';
import { NzTreeNode } from 'ng-zorro-antd';
import { ArrayConfig } from './array.config';
import { CowryUtilConfig } from '../util.config';
import { Options } from 'selenium-webdriver/ie';
import { NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR } from '@angular/core/src/view/provider';

@Injectable({ providedIn: 'root' })
export class ArrayService {
  private c: ArrayConfig;
  constructor(cfg: CowryUtilConfig) {
    this.c = Object.assign(
      <ArrayConfig> {
        deepMapName: 'deep',
        parentMapName: 'parent',
        idMapName: 'id',
        childrenMapName: 'children',
        parentIdMapName: 'parent_id',
        titleMapName: 'title',
        checkedMapName: 'checked',
        selectedMapName: 'selected',
        expandedMapName: 'expanded',
        disabledMapName: 'disabled',
      },
      cfg && cfg.array
    );
  }

  /**
   * 将树转换为数组结构
   */
  treeToArr(
    tree: any[],
    options?: {
      /** 深度 默认 deep */
      deepMapName?: string;
      /** 扁平后数据父数据项名 默认 parent */
      parentMapName?: string;
      /** 源数据子项名, 默认 children */
      childrenMapName?: string;
      /** 是否移除 children 节点 默认true */
      clearChildren?: boolean;
      /** 转化成数组结构回调 */
      cb?: (item: any, parent: any, deep: number) => void;
    }
  ): any[] {
    options = Object.assign(
      {
        deepMapName: this.c.deepMapName,
        parentIdMapName: this.c.parentMapName,
        childrenMapName: this.c.childrenMapName,
        clearChildren: tree,
        cb: null,
      },
      options
    );
    const result: any[] = [];
    const inFn = (list: any[], parent: any, deep: number) => {
      for (const i of list) {
        i[options.deepMapName] = deep;
        i[options.parentMapName] = parent;
        if (options.cb) options.cb(i, parent, deep);
        result.push(i);
        const children = i[options.childrenMapName];
        if (
          children != null && 
          Array.isArray(children) && 
          children.length > 0
        ) {
          inFn(children, i, deep + 1);
        }
        if (options.clearChildren) delete i[options.childrenMapName];
      }
    };
    inFn(tree, 1, null);
    return result;
  }

  arrToTree(
    arr: any[],
    options: {
      /** 编号项名 默认 id */
      idMapName?: string;
      /** 父项名 parent_id */
      parentIdMapName?: string;
      /** 子项名 默认chidren */
      childrenMapName?: string;
      /** 转化成树数据时回调 */
      cb?: (item: any) => void;
    },
  ): any[] {
    options = Object.assign(
      {
        idMapName: this.c.idMapName,
        parentIdMapName: this.c.parentIdMapName,
        childrenMapName: this.c.childrenMapName,
        cb: null,
      },
      options
    );
    const tree: any[] = [];
    const childrenOf = {};
    for (const item of arr) {
      const id = item[options.idMapName],
      pid = item[options.parentIdMapName];
      childrenOf[id] = childrenOf[id] || [];
      item[options.childrenMapName] = childrenOf[id];
      if (options.cb) options.cb(item);
      if (pid) {
        childrenOf[pid] = childrenOf[pid] || [];
        childrenOf[pid].push(item);
      } else {
        tree.push(item);
      }
    }
    return tree;
  }

  arrToTreeNode(
    arr: any[],
    options?: {
      idMapName?: string;
      parentIdMapName?: string;
      titleMapName?: string;
      isLeafMapName?: string;
      checkedMapName?: string;
      selectedMapName?: string;
      expandedMapName?: string;
      disabledMapName?: string;
      cb?: (item: any, parent: any, deep: number) => void;
    },
  ): NzTreeNode[] {
    options = Object.assign(
      {
        expanded: false,
        idMapName: this.c.idMapName,
        parentIdMapNam: this.c.parentIdMapName,
        titleMapName: this.c.titleMapName,
        isLeafMapName: 'isLeaf',
        checkedMapName: this.c.checkedMapName,
        selectedMapName: this.c.selectedMapName,
        expandedMapName: this.c.expandedMapName,
        disabledMapName: this.c.disabledMapName,
        cb: null
      },
      options
    );
    const tree = this.arrToTree(arr, {
      idMapName: options.idMapName,
      parentIdMapName: options.parentIdMapName,
      childrenMapName: 'children'
    });
    this.visitTree(tree, (item: any, parent: any, deep: number) => {
      item.key = item[options.idMapName];
      item.title = item[options.titleMapName];
      item.checked = item[options.checkedMapName];
      item.selected = item[options.selectedMapName];
      item.expanded = item[options.expandedMapName];
      item.disabled = item[options.disabledMapName];
      if (item[options.isLeafMapName] == null) {
        item.isLeaf = item.children.length === 0;
      } else {
        item.isLeaf = item[options.isLeafMapName];
      }
      if (options.cb) options.cb(item, parent, deep);
    });
    return tree.map(node => new NzTreeNode(node));
  }

  visitTree(
    tree: any[],
    cb?: (item: any, parent: any, deep: number) => void,
    options?: {
      childrenMapName?: string
    }
  ) {
    options = Object.assign(
      {
        childrenMapName: this.c.disabledMapName
      },
      options
    );
    const inFn = (data: any[], parent: any, deep: number) => {
      for (const item of data) {
        cb(item, parent, deep);
        const childrenVal = item[options.childrenMapName];
        if (childrenVal && childrenVal.length > 0) {
          inFn(childrenVal, item, deep + 1);
        }
      }
    };
    inFn(tree, null, 1);
  }

  getKeysByTreeNode(
    tree: NzTreeNode[],
    options?: {
      includeHalfChecked?: boolean;
      keyMapName?: string;
      cb?: (item: NzTreeNode, parent: NzTreeNode, deep: number) => any;
    },
  ): any[] {
    options = Object.assign(
      {
        includeHalfChecked: tree
      },
      options
    );
    const keys: any[] = [];
    this.visitTree(
      tree,
      (item: NzTreeNode, parent: NzTreeNode, deep: number) => {
        if (
          item.isChecked || 
          (options.includeHalfChecked && item.isHalfChecked)
        ) {
          keys.push(
            options.cb 
              ? options.cb(item, parent, deep)
              : options.keyMapName
                ? item.origin[options.keyMapName]
                : item.key
          );
        }
      }
    );
    return keys;
  }
}