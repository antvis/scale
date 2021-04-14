import { Continuous, Transform } from './continuous';
import { PowOptions } from '../types';
import { Base } from './base';
import { createInterpolate } from '../utils';
import { calculatePowTicks } from '../tick-method/pow';
import { d3LinearNice } from '../utils/d3-linear-nice';

/**
 * Pow 比例尺
 *
 * 类似于 linear scale, 不同之处在于在计算输出范围值之前对输入域值应用了指数变换, 即 y = x ^ k 其中 k（指数）可以是任何实数。
 */
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

      // 当 exponent 为 0.5 时，我们优先采用 sqrt
      if (exponent === 0.5) {
        return x < 0 ? -Math.sqrt(-1 * x) : Math.sqrt(x);
      }

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
