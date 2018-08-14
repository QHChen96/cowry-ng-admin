import { Injectable, Injector, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { zip } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { I18NService } from '../i18n/i18n.service';

@Injectable()
export class StartupService {
  constructor(
    private translate: TranslateService,
    private httpClient: HttpClient,
    private injector: Injector
  ) {}

  // load(): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     zip(
  //       this.httpClient.get(`assets/tm`)
  //     )
  //   })
  // }
}