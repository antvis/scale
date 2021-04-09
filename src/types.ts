export type TickMethod<T> = (options?: T) => any[];

export type Interpolate<T> = (a: T, b: T) => (t: number) => T;

/**
 * 所有比例尺选项的默认类型
 * D：定义域元素的类型
 * R：值域元素的类型
 */
export type BaseOptions<D = any, R = D> = {
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
 * T：tickMethod 配置项的类型
 */
export type TickOptions<T = any> = {
  /** tick 个数，默认值为 5 */
  tickCount?: number;
  /** 计算 ticks 的算法 */
  tickMethod?: TickMethod<T>;
};

/** 获得比例尺选项中定义域元素的类型 */
export type Domain<O extends BaseOptions> = O['domain'][number];

/** 获得比例尺选项中值域元素的类型 */
export type Range<O extends BaseOptions> = O['range'][number];

/** 获得比例尺选项中 unknown 的类型 */
export type Unknown<O extends BaseOptions> = O['unknown'];

/** Identity 比例尺的选项 */
export type IdentityOptions = BaseOptions<number> & TickOptions;

/** Constant 比例尺的选项 */
export type ConstantOptions = BaseOptions<number | string> & TickOptions;

/** CategoryOptions 比例尺的选项 */
export type CategoryOptions = BaseOptions<number | string, number | string>;

/** Continuous 比例尺的选项 */
export type ContinuousOptions = BaseOptions<number> &
  TickOptions & {
    nice?: boolean;
    clamp?: boolean;
    round?: boolean;
    interpolate?: Interpolate<number>;
  };
