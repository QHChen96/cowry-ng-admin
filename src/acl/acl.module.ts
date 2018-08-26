import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CowryACLConfig } from "./acl.config";

import { ACLService } from './services/acl.service';
import { ACLGuard } from "./services/acl-guard";
const SERVICES = [ACLService, ACLGuard]

import {ACLDirective } from './directives/acl.directive';
const COMPONENTS = [ACLDirective];

@NgModule({
  imports: [CommonModule],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS]
})
export class CowryACLModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CowryACLModule,
      providers: [CowryACLConfig, ...SERVICES]
    }
  }
}