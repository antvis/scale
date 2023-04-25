import { Band } from '../scales/band';
import { Ordinal } from '../scales/ordinal';
import { Constant } from '../scales/constant';
import { Identity } from '../scales/identity';
import { Linear } from '../scales/linear';
import { Point } from '../scales/point';
import { Pow } from '../scales/pow';
import { Sqrt } from '../scales/sqrt';
import { Threshold } from '../scales/threshold';
import { Log } from '../scales/log';
import { Quantize } from '../scales/quantize';
import { Quantile } from '../scales/quantile';
import { Time } from '../scales/time';
import { Sequential } from '../scales/sequential';
import { Diverging } from '../scales/diverging';
import type {
  BandOptions,
  OrdinalOptions,
  ConstantOptions,
  IdentityOptions,
  LinearOptions,
  PointOptions,
  PowOptions,
  SqrtOptions,
  ThresholdOptions,
  LogOptions,
  QuantizeOptions,
  QuantileOptions,
  TimeOptions,
  SequentialOptions,
  DivergingOptions,
} from '../types';

export function createScale(type: 'Band', options: BandOptions): Band;
export function createScale(type: 'Ordinal', options: OrdinalOptions): Ordinal;
export function createScale(type: 'Constant', options: ConstantOptions): Constant;
export function createScale(type: 'Identity', options: IdentityOptions): Identity;
export function createScale(type: 'Linear', options: LinearOptions): Linear;
export function createScale(type: 'Point', options: PointOptions): Point;
export function createScale(type: 'Pow', options: PowOptions): Pow;
export function createScale(type: 'Sqrt', options: SqrtOptions): Sqrt;
export function createScale(type: 'Threshold', options: ThresholdOptions): Threshold;
export function createScale(type: 'Log', options: LogOptions): Log;
export function createScale(type: 'Quantize', options: QuantizeOptions): Quantize;
export function createScale(type: 'Quantile', options: QuantileOptions): Quantile;
export function createScale(type: 'Time', options: TimeOptions): Time;
export function createScale(type: 'Sequential', options: SequentialOptions): Sequential;
export function createScale(type: 'Diverging', options: DivergingOptions): Diverging;
export function createScale(type: string, options: Record<string, any>) {
  switch (type) {
    case 'Band':
      return new Band(options);
    case 'Ordinal':
      return new Ordinal(options);
    case 'Constant':
      return new Constant(options);
    case 'Identity':
      return new Identity(options);
    case 'Linear':
      return new Linear(options);
    case 'Point':
      return new Point(options);
    case 'Pow':
      return new Pow(options);
    case 'Sqrt':
      return new Sqrt(options);
    case 'Threshold':
      return new Threshold(options);
    case 'Log':
      return new Log(options);
    case 'Quantize':
      return new Quantize(options);
    case 'Quantile':
      return new Quantile(options);
    case 'Time':
      return new Time(options);
    case 'Sequential':
      return new Sequential(options);
    case 'Diverging':
      return new Diverging(options);
    default:
      return null;
  }
}
