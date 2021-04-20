import { identity } from '@antv/util';
import { Continuous, Transform } from './continuous';
import { PowOptions } from '../types';
import { Base } from './base';
import { createInterpolate, d3LinearNice } from '../utils';
import { pretty } from '../tick-methods/pretty';

const transformPow = (exponent: number) => {
  return (x: number) => {
    return x < 0 ? -((-x) ** exponent) : x ** exponent;
  };
};

const transformPowInvert = (exponent: number) => {
  return (x: number) => {
    return x < 0 ? -((-x) ** (1 / exponent)) : x ** (1 / exponent);
  };
};

const transformSqrt = (x: number) => {
  return x < 0 ? -Math.sqrt(-x) : Math.sqrt(x);
};

/**
 * Pow 比例尺
 *
 * 类似于 linear scale, 不同之处在于在计算输出范围值之前对输入域值应用了指数变换,.
 * 即 y = x ^ k 其中 k（指数）可以是任何实数。
 */
export class Pow<O extends PowOptions = PowOptions> extends Continuous<O> {
  protected getOverrideDefaultOptions() {
    return {
      domain: [0, 1],
      range: [0, 1],
      nice: false,
      clamp: false,
      round: false,
      exponent: 2,
      interpolate: createInterpolate,
      tickMethod: pretty,
      tickCount: 5,
    } as O;
  }

  protected chooseTransform(): Transform {
    const { exponent } = this.options;
    if (exponent === 1) {
      return identity;
    }
    return exponent === 0.5 ? transformSqrt : transformPow(exponent);
  }

  protected chooseUntransform(): Transform {
    const { exponent } = this.options;
    return exponent === 1 ? identity : transformPowInvert(exponent);
  }

  public clone(): Base<O> {
    return new Pow<O>(this.options);
  }

  public getTicks() {
    const { tickCount, domain, tickMethod } = this.options;
    const lastIndex = domain.length - 1;
    const min = domain[0];
    const max = domain[lastIndex];
    return tickMethod(min, max, tickCount);
  }

  protected nice() {
    const { domain } = this.options;
    this.options.domain = d3LinearNice(domain);
  }
}
