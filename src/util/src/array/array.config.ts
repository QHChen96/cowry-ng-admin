export interface ArrayConfig {
  /** 深度项名 默认 deep */
  deepMapName?: string;
  /** 扁平后数组的父数据项名 parent */
  parentMapName?: string;
  /** 编号项名 默认 id */
  idMapName?: string;
  /** 父编号项名 默认parent_id */
  parentIdMapName?: string;
  /** 源数据子项名 默认children */
  childrenMapName?: string;
  /** 标题项名 默认title */
  titleMapName?: string;
  /** 节点 checkbox 是否选中项名 默认checked */
  checkedMapName?: string;
  /** 节点本身是否选中项名 默认 selected */
  selectedMapName?: string;
  /** 节点是否展开（叶子节点无效）项名 默认expanded */
  expandedMapName?: string;
  /** 设置是否禁用节点（不可以进行任何操作）项目 默认disabled */
  disabledMapName?: string;
}