import { Injector } from '@angular/core';
import { Router } from '@angular/router';
import { JWTTokenModel } from './jwt/jwt.model';
import { CowryAuthConfig } from '../auth.config';
import { WINDOW } from '../win.tokens';

export function CheckJwt(model: JWTTokenModel, offset: number): boolean {
  return model != null && model.token && !model.isExpired(offset);
}

export function ToLogin(options: CowryAuthConfig, injector: Injector) {
  if (options.token_invalid_redirect === true) {
    setTimeout(() => {
      if (/^https?:\/\//g.test(options.login_url)) {
        injector.get(WINDOW).location.href = options.login_url;
      } else {
        injector.get(Router).navigate([options.login_url]);
      }
    });
  }
}