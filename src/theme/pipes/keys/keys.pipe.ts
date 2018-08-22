import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'key' })
export class KeysPipe implements PipeTransform {
  transform(value: any, keyIsNumber: boolean = false): any[] {
    const ret = [];
    for (const key in value) {
      ret.push({ key: keyIsNumber ? +key : key, value: value[key] })
    }
    return ret;
  }
}
