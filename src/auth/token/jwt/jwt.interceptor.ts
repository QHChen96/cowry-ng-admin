import { Injectable } from "@angular/core";
import { BaseInterceptor } from "../base.interceptor";
import { CowryAuthConfig } from "../../auth.config";
import { DA_SERVICE_TOKEN } from "../interface";
import { JWTTokenModel } from "./jwt.model";
import { CheckJwt } from "../helper";
import { HttpRequest } from "@angular/common/http";

@Injectable()
export class JWTInterceptor extends BaseInterceptor {
  isAuth(options: CowryAuthConfig): boolean {
    this.model = this.injector
        .get(DA_SERVICE_TOKEN)
        .get<JWTTokenModel>(JWTTokenModel);
    return CheckJwt(this.model as JWTTokenModel, options.token_exp_offset);
  }

  setReq(req: HttpRequest<any>, options: CowryAuthConfig): HttpRequest<any> {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.model.token}`
      }
    });
  }
}