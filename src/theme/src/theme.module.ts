import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WINDOW } from './win.tokens';

// region: import
import { COWRY_I18N_TOKEN, CowryI18NServiceImpl } from './services/i18n/i18n';

import { ModalHelper } from './services/modal/modal.helper';
const HELPERS = [ModalHelper];

// components
const COMPONENTS = [];

// pipes
import { DatePipe } from './pipes/date/date.pipe';
import { CNCurrencyPipe } from './pipes/currency/cn-currency.pipe';
import { KeysPipe } from './pipes/keys/keys.pipe';
import { YNPipe } from './pipes/yn/yn.pipe';
const PIPES = [DatePipe, CNCurrencyPipe, KeysPipe, YNPipe];

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [...COMPONENTS, ...PIPES],
  exports: [...COMPONENTS, ...PIPES],
})
export class CowryThemeModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CowryThemeModule,
      providers: [
        { provide: WINDOW, useValue: window },
        { provide: COWRY_I18N_TOKEN, useClass: CowryI18NServiceImpl },
        ...HELPERS
      ]
    }
  }

  static forChild(): ModuleWithProviders {
    return {
      ngModule: CowryThemeModule,
      providers: [...HELPERS]
    }
  }
}