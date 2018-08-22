export interface HttpClientConfig {
  /**
   * 空值处理
   * - include: 包含
   * - ignore:  忽略
   */
  nullValueHandling?: 'include' | 'ignore',

  /**
   * 时间值处理
   * - timestamp: 时间戳
   * - ignore:    忽略
   */
  dateValueHandling?: 'timestamp' | 'ignore'
}