import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export const DA_SERVICE_TOKEN = new InjectionToken<ITokenService>(
  'COWRY_AUTH_TOKEN_SERVICE_TOKEN'
);


export interface ITokenModel {
  [key: string]: any;

  token: string;
}

export interface ITokenService {
  set(data: ITokenModel): boolean;

  get(type?: any): ITokenModel;

  get<T extends ITokenModel>(type?: any): T;

  clear(): void;

  change(): Observable<ITokenModel>;

  /** 获取登录地址 */
  readonly login_url: string;

  /** 登录后跳转的地址, 未指定时返回 */
  redirect: string;
}