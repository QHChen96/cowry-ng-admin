import { Optional, Injector } from '@angular/core';
import { Router } from '@angular/router';

import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpSentEvent,
  HttpHeaderResponse,
  HttpProgressEvent,
  HttpResponse,
  HttpUserEvent,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable, Observer } from 'rxjs';

import { _HttpClient } from '@theme';
import { ITokenModel } from './interface';
import { CowryAuthConfig } from '../auth.config';
import { ToLogin } from './helper';

export abstract class BaseInterceptor implements HttpInterceptor {
  constructor(@Optional() protected injector: Injector) {}

  protected model: ITokenModel;

  abstract isAuth(options: CowryAuthConfig): boolean;

  abstract setReq(
    req: HttpRequest<any>,
    options: CowryAuthConfig,
  ): HttpRequest<any>;

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<
    | HttpSentEvent
    | HttpHeaderResponse
    | HttpProgressEvent
    | HttpResponse<any>
    | HttpUserEvent<any>
  > {
    const options = Object.assign(
      new CowryAuthConfig(),
      this.injector.get(CowryAuthConfig, null),
    );
    if (options.ignore) {
      for (const item of options.ignore as RegExp[]) {
        if (item.test(req.url)) return next.handle(req);
      }
    }

    if (
      options.allow_anonymous_key &&
      (req.params.has(options.allow_anonymous_key) ||
        this.injector
          .get(Router)
          .parseUrl(req.urlWithParams)
          .queryParamMap.has(options.allow_anonymous_key))
    ) {
      return next.handle(req);
    }

    if (this.isAuth(options)) {
      req = this.setReq(req, options);
    } else {
      ToLogin(options, this.injector);
      const hc = this.injector.get(_HttpClient, null);
      if (hc) hc.end();
      return new Observable((observer: Observer<HttpEvent<any>>) => {
        const res = new HttpErrorResponse({
          status: 401,
          statusText: `From Simple Inteceptor`
        });
        observer.error(res);
      });
    }
    return next.handle(req);
  }

}