import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ACLType, ACLCanType } from './acl.type';

@Injectable()
export class ACLService {
  private roles: string[] = [];
  private abilities: (number | string)[] = [];
  private full = false;
  private aclChange: BehaviorSubject<ACLType | boolean> = new BehaviorSubject<
    ACLType | boolean
  >(null);

  /** ACL变更通知 */
  get change(): Observable<ACLType | boolean> {
    return this.aclChange.asObservable();
  }

  /** 获取所有的数据 */
  get data() {
    return {
      full: this.full,
      roles: this.roles,
      abilities: this.abilities
    };
  }

  private parseACLType(val: string | string[] | ACLType): ACLType {
    if (typeof val !== 'string' && !Array.isArray(val)) {
      return <ACLType> val;
    }
    if (Array.isArray(val)) {
      return <ACLType>{ role: <String[]>val }
    }
    return <ACLType> {
      role: [val]
    }
  }

  /**
   * 设置权限
   * @param value 
   */
  set(value: ACLType) {
    this.abilities = [];
    this.roles = [];
    this.add(value);
    this.aclChange.next(value);
  }

  /**
   * 标识当前用户为全量, 即不受限
   * @param value 
   */
  setFull(value: boolean) {
    this.full = value;
    this.aclChange.next(value);
  }

  /**
   * 
   * 设置当前用户权限
   * @param abilities
   */
  setAbility(abilities: (number | string)[]) {
    this.set(<ACLType>{ ability: abilities });
  }

  /**
   * 设置当前用户角色
   * @param roles 
   */
  setRole(roles: string[]) {
    this.set(<ACLType>{ role: roles });
  }

  add(value: ACLType) {
    if (value.role && value.role.length > 0) {
      this.roles.push(...value.role);
    }
    if (value.ability && value.ability.length > 0) {
      this.abilities.push(...value.ability);
    }
  }

  attachRole(roles: string[]) {
    for (const val of roles) {
      if (!this.roles.includes(val)) {
        this.roles.push(val);
      }
    }
    this.aclChange.next(this.data);
  }

  attachAbility(abilities: (number | string)[]) {
    for (const val of abilities) {
      if (!this.abilities.includes(val)) {
        this.abilities.push(val);
      }
    }
    this.aclChange.next(this.data);
  }

  removeRole(roles: string[]) {
    for (const val of roles) {
      const idx = this.roles.indexOf(val);
      if (idx !== -1) {
        this.roles.splice(idx, 1);
      }
    }
    this.aclChange.next(this.data);
  }


  removeAbility(abilities: (number | string)[]) {
    for (const val of abilities) {
      const idx = this.abilities.indexOf(val);
      if (idx !== -1) {
        this.abilities.splice(idx, 1);
      }
    }
    this.aclChange.next(this.data);
  }

  can(roleOrAbility: ACLCanType): boolean {
    if (this.full === true || !roleOrAbility) {
      return true;
    }

    let t: ACLType = {};
    if (typeof roleOrAbility === 'number') {
      t = { ability: [roleOrAbility] };
    } else if (
      Array.isArray(roleOrAbility) &&
      roleOrAbility.length > 0 && typeof roleOrAbility[0] === 'number'
    ) {
      t = { ability: roleOrAbility }
    } else {
      t = this.parseACLType(roleOrAbility);
    }

    if (t.role) {
      if (t.mode === 'allOf') return t.role.every(v => this.roles.includes(v));
      else return t.role.some(v => this.roles.includes(v));
    }

    if (t.ability) {
      if (t.mode === 'allOf')
        return (t.ability as any[]).every(v => this.abilities.includes(v));
      else return (t.ability as any[]).some(v => this.abilities.includes(v));
    }
    return false;
  }

  parseAbility(value: ACLCanType): ACLCanType {
    if (
      typeof value === 'number' ||
      typeof value === 'string' ||
      Array.isArray(value)
    ) {
      value = <ACLType>{ ability: Array.isArray(value) ? value : [value] }
    }
    delete value.role;
    return value;
  }

  canAbility(value: ACLCanType): boolean {
    return this.can(this.parseAbility(value));
  }

}