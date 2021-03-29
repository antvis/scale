export type Primitive = number | string;

export type BaseOptions<R = Primitive, D = Primitive, T = any> = {
  /** 当需要映射的值不合法的时候，返回的值 */
  unknown?: string;
  /** 值域，默认为 [0, 1] */
  range: R[];
  /** 定义域，默认为 [0, 1] */
  domain: D[];
  /** tick 格式化函数，会影响数据在坐标轴 axis、legend、tooltip 上的显示 */
  formatter: (x: Primitive) => string;
  /** tick 个数，默认值为 5 */
  tickCount: number;
  /** tick 间隔的最大值，默认值为 10 */
  tickInterval: number;
  /** 计算 ticks 的算法 */
  tickMethod: (options?: T) => Primitive[];
};
