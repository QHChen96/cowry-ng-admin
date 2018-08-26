import { deepGet } from '../other/other';

export function format(str: string, obj: {}, needDeepGet = false): string {
  return (str || '').replace(
    /\${([^}]+)}/g,
    (work: string, key: string) =>
      needDeepGet
        ? deepGet(obj, key.split('.'), '')
        : (obj || {})[key] || ''
  );
}

/**
 * 转化成RMB
 * @param value
 * @param digits 
 */
export function yuan(value:any, digits: number = 2): string {
  if (typeof value === 'number') value = value.toFixed(digits);
  return `&yen ${value}`;
}