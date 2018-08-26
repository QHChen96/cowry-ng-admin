import {
  Directive,
  Input,
  ElementRef,
  Renderer2,
  OnDestroy
} from '@angular/core';
import { Subscription } from 'rxjs';
import {} from '../services/acl.services';
import {} from '../services/acl.type';

@Directive({
  selector: '[acl]'
})
export class ACLDirective implements OnDestroy {
  private _value: any;
  private change$: Subscription;

  @Input('acl')
  set acl(value: AclCanType) {
    
  }

}