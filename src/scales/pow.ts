import { Continuous, Transform } from './continuous';
import { PowOptions } from '../types';
import { Base } from './base';
import { createInterpolate } from '../utils';
import { calculatePowTicks } from '../tick-method/pow';
import { d3LinearNice } from '../utils/d3-linear-nice';

export class Pow extends Continuous<PowOptions> {
  protected getOverrideDefaultOptions() {
    return {
      domain: [0, 1],
      range: [0, 1],
      nice: false,
      clamp: false,
      round: false,
      exponent: 2,
      interpolate: createInterpolate,
      tickMethod: calculatePowTicks,
      tickCount: 5,
    } as PowOptions;
  }

  protected chooseTransform(): Transform {
    return (x: number) => {
      const { exponent } = this.options;
      return x < 0 ? -((-1 * x) ** exponent) : x ** exponent;
    };
  }

  protected chooseUntransform(): Transform {
    return (x: number) => {
      const { exponent } = this.options;
      return x < 0 ? -((-1 * x) ** (1 / exponent)) : x ** (1 / exponent);
    };
  }

  clone(): Base<PowOptions> {
    return new Pow(this.options);
  }

  protected nice() {
    const { domain } = this.options;
    this.options.domain = d3LinearNice(domain);
  }
}
