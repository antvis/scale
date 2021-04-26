/** 获得 ticks 的方法 */
export type TickMethod = (min: number | Date, max: number | Date, n?: number, ...rest: any[]) => (number | Date)[];

/** nice domain 的方法 */
export type NiceMethod = TickMethod;

/** 插值器工厂 */
export type Interpolate = (a: number, b: number) => (t: number) => number;

/** 比较器 */
export type Comparator = (a: string | number, b: string | number) => number;

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
};

/**
 * 支持 getTicks 的比例尺的选项
 * T：tickMethod 配置项的类型
 */
export type TickOptions = {
  /** tick 个数，默认值为 5 */
  tickCount?: number;
  /** 计算 ticks 的算法 */
  tickMethod?: TickMethod;
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
export type ConstantOptions = BaseOptions<number | string>;

/** Continuous 比例尺的选项 */
export type ContinuousOptions<D = any, R = D> = BaseOptions<D, R> &
  TickOptions & {
    /** 是否需要对定义域的范围进行优化 */
    nice?: boolean;
    /** 是否需要限制输入的范围在值域内 */
    clamp?: boolean;
    /** 是否需要对输出进行四舍五入 */
    round?: boolean;
    /** 插值器的工厂函数，返回一个对归一化后的输入在值域指定范围内插值的函数 */
    interpolate?: Interpolate;
  };

/** Linear 比例尺的选项 */
export type LinearOptions = ContinuousOptions<number>;

/** Pow 比例尺的选项 */
export type PowOptions = ContinuousOptions<number> & {
  /** 指数 */
  exponent?: number;
};

/** Sqrt 比例尺的选项 */
export type SqrtOptions = Omit<PowOptions, 'exponent'>;

/** Log 比例尺的选项 */
export type LogOptions = ContinuousOptions<number> & {
  /** 底数 */
  base?: number;
};

/** time 比例尺的选项 */
export type TimeOptions = ContinuousOptions<Date, number> & {
  /** getTick 的时间间隔 */
  tickInterval?: number;
  /** 格式化的形式 */
  mask?: string;
  /** 是否是 utc 时间 */
  utc?: boolean;
};

/** OrdinalOptions 比例尺的选项 */
export type OrdinalOptions = BaseOptions<number | string> & { compare?: Comparator };

/** 详细请参阅 scale/band.ts */
export type BandOptions = BaseOptions<number | string, number> & {
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
  /** 比较器，用于对 domain 进行排序 */
  compare?: Comparator;
};

/** Point 比例尺的选项 */
export type PointOptions = Omit<BandOptions, 'paddingInner' | 'paddingOuter'>;

/** Threshold 比例尺的选项 */
export type ThresholdOptions = BaseOptions<number, any>;

/** Quantize 比例尺的选项 */
export type QuantizeOptions = ThresholdOptions &
  TickOptions & {
    /** 是否需要 nice */
    nice?: boolean;
  };

/** Quantile 比例尺的选项 */
export type QuantileOptions = ThresholdOptions & TickOptions;
