import * as deepExtend from 'extend';


export function deepGet(obj: any, path: string | string[], defaultValue?: any) {
  if (!obj || path == null || path.length === 0) return defaultValue;
  if (!Array.isArray(path)) {
    path = ~path.indexOf('.') ? path.split('.') : [ path ];
  }
  if (path.length === 1) {
    const checkObj = obj[path[0]];
    return typeof checkObj === 'undefined' ? defaultValue : checkObj;
  }
  return path.reduce((o, k) => (o || {})[k], obj) || defaultValue;
}

export function deepCopy(obj: any) {
  const result = deepExtend(true, {}, { _: obj });
  return result._;
}

export function copy(value: string): Promise<string> {
  return new Promise<string>((resolve, reject): void => {
    let copyTextArea = null as HTMLTextAreaElement;
    try {
      copyTextArea = document.createElement('textarea');
      copyTextArea.style.height = '0px';
      copyTextArea.style.opacity = '0';
      copyTextArea.style.width = '0px';
      document.body.appendChild(copyTextArea);
      copyTextArea.value = value;
      copyTextArea.select();
      document.execCommand('copy');
    } finally {
      if (copyTextArea && copyTextArea.parentNode) {
        copyTextArea.parentNode.removeChild(copyTextArea);
      }
    }
  });
}