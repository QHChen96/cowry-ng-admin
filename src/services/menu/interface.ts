export interface Menu {
  [key: string]: any;
  /** 文本 */
  text: string;
  /** i18n */
  i18n?: string;
  /** 是否菜单组 */
  group?: boolean;
  /** 路由 */
  link?: string;
  /** 是否精准匹配 */
  linkExact?: boolean;
  /** 外部链接 */
  externalLink?: string;
  /** 链接 */
  target?: '_blank' | '_self' | '_parent' | '_top';
  /** 图标 */
  icon?: string;
  /** 徽标数, 展示的数字 */
  badge?: number;
  /** 徽标数，显示小红点 */
  badge_dot?: boolean;
  /** 徽标badge颜色 */
  badge_status?: string;
  /** 是否隐藏菜单 */
  hide?: boolean;
  /** 隐藏面包屑 */
  hideInBreadcrumb?: boolean;
  /** acl */
  acl?: any;
  /** 是否快捷菜单项 */
  shortcut?: boolean;
  /** 快捷菜单根节点 */
  shortcut_root?: boolean;
  /** 是否允许复用 */
  reuse?: boolean;
  /** 二级菜单 */
  children?: Menu[]
}