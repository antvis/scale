import { identity } from '@antv/util';
import { Continuous } from './continuous';
import { PowOptions, Transform } from '../types';
import { Base } from './base';
import { createInterpolateValue } from '../utils';
import { d3Ticks } from '../tick-methods/d3-ticks';

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
  protected getDefaultOptions() {
    return {
      domain: [0, 1],
      range: [0, 1],
      nice: false,
      clamp: false,
      round: false,
      exponent: 2,
      interpolate: createInterpolateValue,
      tickMethod: d3Ticks,
      tickCount: 5,
    } as O;
  }

  // 显示指定 options 的类型为 PowOptions O 的类型
  constructor(options?: PowOptions) {
    super(options as O);
  }

  protected chooseTransforms(): Transform[] {
    const { exponent } = this.options;
    if (exponent === 1) return [identity, identity];
    const transform = exponent === 0.5 ? transformSqrt : transformPow(exponent);
    const untransform = transformPowInvert(exponent);
    return [transform, untransform];
  }

  public clone(): Base<O> {
    return new Pow<O>(this.options);
  }
}
