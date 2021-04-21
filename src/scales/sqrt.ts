import { createInterpolate } from '../utils';
import { pretty } from '../tick-methods/pretty';
import { SqrtOptions, PowOptions } from '../types';
import { Pow } from './pow';

export class Sqrt extends Pow<SqrtOptions & PowOptions> {
  protected getOverrideDefaultOptions() {
    return {
      domain: [0, 1],
      range: [0, 1],
      nice: false,
      clamp: false,
      round: false,
      interpolate: createInterpolate,
      tickMethod: pretty,
      tickCount: 5,
      exponent: 0.5,
    } as SqrtOptions;
  }

  constructor(options?: SqrtOptions) {
    super(options);
  }

  update(options?: SqrtOptions) {
    super.update(options);
  }

  protected getExponent() {
    return 0.5;
  }

  public clone(): Sqrt {
    return new Sqrt(this.options);
  }
}
