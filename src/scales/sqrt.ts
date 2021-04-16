import { createInterpolate } from '../utils';
import { pretty } from '../tick-method/pretty';
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
      tickMethod: pretty,
      tickCount: 5,
    } as SqrtOptions;
  }

  public clone(): Sqrt {
    return new Sqrt(this.options);
  }
}
