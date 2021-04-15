import { createInterpolate } from '../utils';
import { calculatePowTicks } from '../tick-method/pow';
import { SqrtOptions } from '../types';
import { Pow } from './pow';

export class Sqrt extends Pow {
  protected getOverrideDefaultOptions() {
    return {
      domain: [0, 1],
      range: [0, 1],
      nice: false,
      clamp: false,
      round: false,
      exponent: 0.5,
      interpolate: createInterpolate,
      tickMethod: calculatePowTicks,
      tickCount: 5,
    } as SqrtOptions;
  }

  clone(): Sqrt {
    return new Sqrt(this.options);
  }
}
