/** 是否数字 */
export function isNum(value: string | number): boolean {
  return /^((-?\d+\.\d+)|(-?\d+)|(-?\.\d+))$/.test(value.toString());
}

/** 是否整数 */
export function isInt(value: string | number): boolean {
  return isNum(value) && parseInt(value.toString(), 10) == value;
}

/**
 * 是否小数
 * @param value 
 */
export function isDecimal(value: string | number): boolean {
  return isNum(value) && !isInt(value);
}

/**
 * 
 * 是否为身份证
 * @param value 
 */
export function isIdCard(value: any): boolean {
  return (
    typeof value === 'string' && /(^\d{15}$)|(^\d{17}([0-9]|X)$)/i.test(value)
  )
}

export function isMobile(value: any): boolean {
  return (
    typeof value === 'string' && 
    /^(0|\+?86|17951)?(13[0-9]|15[0-9]|17[0678]|18[0-9]|14[57])[0-9]{8}$/.test(
      value
    )
  );
}

