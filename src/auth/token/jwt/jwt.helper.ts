export function urlBase64Decode(str: string): string {
  let output = str.replace(/-/g, '+').replace(/_/g, '/');
  switch (output.length % 4) {
    case 0:
      break;
    case 2: {
      output += '==';
      break;
    }
    case 3: {
      output += '=';
      break;
    }
    default: {
      throw new Error(
        `'atob' failed: The string to decoded is not correctly encoded.`
      );
    }
  }
  return b64DecodeUnicode(output);
}

function b64decode(str: string): string {
  const chars = 
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  let output: string = '';

  str = String(str).replace(/=+$/, '');

  for (
    let bc: number = 0, bs: any, buffer: any, idx: number = 0;
    (buffer = str.charAt(idx++));
    ~buffer && 
    ((bs = bc % 4 ? bs * 64 + buffer : buffer), 
    bc++ % 4)
      ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
      : 0 
  ) {
    buffer = chars.indexOf(buffer);
  } 
  return output;
}
function b64DecodeUnicode(str: any) {
  return decodeURIComponent(
    Array.prototype.map
      .call(b64decode(str), (c: any) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(''),
  );
}

