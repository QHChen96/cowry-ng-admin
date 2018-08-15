import { InjectionToken, Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

export interface CowryI18NService {
  [key: string]: any;

  use(lang: string): void;

  getLangs(): any[];

  fanyi(key: string): any;

  readonly change: Observable<String>;
}

export const COWRY_I18N_TOKEN = new InjectionToken<CowryI18NService> (
  'cowryTranslatorToken'
);

@Injectable({
  providedIn:'root'
})
export class CowryI18NServiceImpl implements CowryI18NService {
  private change$ = new BehaviorSubject<string>(null);

  get change(): Observable<string> {
    return this.change$.asObservable().pipe(filter(w => w != null));
  }

  use(lang: string): void {
    this.change$.next(lang);
  }

  getLangs(): any[] {
    return [];
  }

  fanyi(key: string) {
    return key;
  }

}