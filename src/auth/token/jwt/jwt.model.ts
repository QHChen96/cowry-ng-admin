import { ITokenModel } from '../interface';
import { urlBase64Decode } from './jwt.helper';

export class JWTTokenModel implements ITokenModel {
  [key: string]: any;

  token: string;

  get payload(): any {
    const parts = (this.token || '').split('.');
    if (parts.length !== 3) throw new Error('JWT must have 3 parts');
    
    const decoded = urlBase64Decode(parts[1]);
    return JSON.parse(decoded);
  }

  isExpired(offsetSeconds: number = 0): boolean {
    const decoded = this.payload;
    if (!decoded.hasOwnProperty('exp')) return null;

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);

    return !(date.valueOf() > new Date().valueOf() + offsetSeconds * 1000);
  }

}