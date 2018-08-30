import { CanActivate, CanActivateChild, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Injectable } from '@angular/core';
import { ACLService } from './acl.service';
import { ACLCanType, ACLType } from './acl.type';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CowryACLConfig } from '../acl.config';


@Injectable()
export class ACLGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private srv: ACLService,
    private router: Router,
    private options: CowryACLConfig
  ) {}

  private process(
    guard: ACLCanType | Observable<ACLCanType>,
  ): Observable<boolean> {
    return (guard && guard instanceof Observable
      ? guard
      : of(
        typeof guard !== 'undefined' && guard !== null
          ? (guard as ACLCanType) : null
      )
    ).pipe(
      map(v => this.srv.can(v)),
      tap(v => {
        if (v) return;
        this.router.navigateByUrl(this.options.guard_url)
      }),
    );
  }

  canLoad(route: Route): Observable<boolean> {
    return this.process((route.data && route.data.guard) || null);
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> {
    return this.canActivateChild(childRoute, state);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.process((route.data && route.data.guard) || null);
  }
}
