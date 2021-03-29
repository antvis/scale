export type Primitive = number | string;

export type BaseOptions<R = Primitive, D = Primitive, T = any> = {
  unknown?: string;
  range: R[];
  domain: D[];
  formatter: (x: Primitive) => string;
  tickCount: number;
  tickInterval: number;
  tickMethod: (options?: T) => Primitive[];
};
