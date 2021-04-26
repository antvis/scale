// scales
export { Band } from './scales/band';
export { Ordinal } from './scales/ordinal';
export { Constant } from './scales/constant';
export { Identity } from './scales/identity';
export { Linear } from './scales/linear';
export { Point } from './scales/point';
export { Pow } from './scales/pow';
export { Sqrt } from './scales/sqrt';
export { Threshold } from './scales/threshold';
export { Log } from './scales/log';
export { Quantize } from './scales/quantize';
export { Quantile } from './scales/quantile';
export { Time } from './scales/time';

// tick-methods
export { d3Linear } from './tick-methods/d3-linear';
export { rPretty } from './tick-methods/r-pretty';
export { wilkinsonExtended } from './tick-methods/wilkinson-extended';

// scales types
export type {
  BaseOptions,
  BandOptions,
  OrdinalOptions,
  ConstantOptions,
  IdentityOptions,
  LinearOptions,
  PointOptions,
  PowOptions,
  TimeOptions,
  ThresholdOptions,
  QuantizeOptions,
  SqrtOptions,
  QuantileOptions,
  LogOptions,
  ScaleOptions,
} from './types';

// others
export type { TickMethod, Interpolate, Comparator } from './types';
