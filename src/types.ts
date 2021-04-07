export type TickMethod<T> = (options?: T) => any[];

/**
 * 所有比例尺选项的默认类型
 * D：定义域元素的类型
 * R：值域元素的类型
 * T：tickMethod 配置项的类型
 */
export type BaseOptions<D = any, R = any> = {
  /** 当需要映射的值不合法的时候，返回的值 */
  unknown?: any;
  /** 值域，默认为 [0, 1] */
  range?: R[];
  /** 定义域，默认为 [0, 1] */
  domain?: D[];
  /** tick 格式化函数，会影响数据在坐标轴 axis、legend、tooltip 上的显示 */
  formatter?: (x: R) => string;
};

/**
 * 支持 getTicks 的比例尺的选项
 */
export type TickOptions<T = any> = {
  /** tick 个数，默认值为 5 */
  tickCount?: number;
  /** tick 间隔的最大值，默认值为 10 */
  tickInterval?: number;
  /** 计算 ticks 的算法 */
  tickMethod?: TickMethod<T>;
};

/** 获得比例尺选项中定义域元素的类型 */
export type Domain<O extends BaseOptions> = O['domain'][number];

/** 获得比例尺选项中值域元素的类型 */
export type Range<O extends BaseOptions> = O['range'][number];

/** 获得比例尺选项中 unknown 的类型 */
export type Unknown<O extends BaseOptions> = O['unknown'];

export type IdentityOptions = BaseOptions<number, number> & TickOptions;

export type ConstantOptions = BaseOptions<number | string, number | string> & TickOptions;

export type CategoryOptions = BaseOptions<number | string, number | string>;

/** 详细请参阅 scale/band.ts */
export interface BandOptions extends BaseOptions<number | string, number> {
  /** 单个 band 宽度 */
  bandWidth?: number;
  /** 是否取整 */
  round?: boolean;
  /** 内部边距 */
  paddingInner?: number;
  /** 两侧边距 */
  paddingOuter?: number;
  /** 同时定义内部边距和两侧边距，如果该值大于 0，则 paddingInner 和 paddingOuter 无效 */
  padding?: number;
  /** 对齐，取值为 0 - 1 的整数，例如 0.5 表示居中 */
  align?: number;
}
