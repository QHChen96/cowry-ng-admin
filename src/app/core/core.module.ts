import { NgModule, Optional, SkipSelf } from '@angular/core';
import { throwIfAlreadlyLoaded } from './module-import-guard';
import { I18NService } from './i18n/i18n.service';

@NgModule({
  providers: [I18NService]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    throwIfAlreadlyLoaded(parentModule, 'CoreModule');
  }
}
