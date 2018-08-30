export class CowryAuthConfig {
  
  /** 存储KEY值 */
  store_key? = '_token';

  /** 无效跳转至登录页 */
  token_invalid_redirect? = true;

  /** 过期时间偏移值 默认10秒 单位:秒 */
  token_exp_offset? = 10;

  /** 发送token参数名 默认token */
  token_send_key? = 'token';

  token_send_template? = '${token}';

  /** 发送token的位置, 默认token */
  token_send_place?: 'header' | 'body' | 'url' = 'header';

  login_url? = `/login`;

  ignore?: RegExp[] = [/\/login/, /assets\//, /passport\//];

  /** 允许匿名登录KEY，请求中带又该KEY表示忽略TOKEN */
  allow_anonymous_key? = `_allow_anonymous`;



}