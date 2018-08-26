export interface ACLType {

  /**
   * 角色
   */
  role?: string[];

  /**
   * 权限点
   */
  ability?: number[] | string[];

  /**
   * 校验模式 默认 `oneOf`
   * allOf 必须满足所有角色或权限点
   * oneOf 只须满足角色或权限点中的一项 
   */
  mode?: 'allOf' | 'oneOf';

  [key: string]: any;
}
  
export type ACLCanType = number | number[] | string | string[] | ACLType;