import { isNumber, identity } from '@antv/util';
import { Base } from './base';
import { ContinuousOptions, Domain, Range } from '../types';
import {
  createInterpolate,
  createInterpolateRound,
  createClamp,
  createNormalize,
  bisect,
  compose,
  d3LinearNice,
} from '../utils';

/** 柯里化后的函数的类型，对输入的值进行处理 */
export type Transform = (x: number) => number;

/** 柯里化后的函数的工厂函数类型 */
export type CreateTransform = (...args: any[]) => Transform;

/** 当 domain 和 range 只有一段的时候的 map 的 工厂函数 */
const createBiMap: CreateTransform = (domain, range, createInterpolate) => {
  const [d0, d1] = domain;
  const [r0, r1] = range;
  let normalize: Transform;
  let interpolate: Transform;
  if (d0 < d1) {
    normalize = createNormalize(d0, d1);
    interpolate = createInterpolate(r0, r1);
  } else {
    normalize = createNormalize(d1, d0);
    interpolate = createInterpolate(r1, r0);
  }
  return compose(interpolate, normalize);
};

/** 当 domain 和 range 有多段时候的 map 的 工厂函数 */
const createPolyMap: CreateTransform = (domain, range, createInterpolate) => {
  const len = Math.min(domain.length, range.length) - 1;
  const normalizeList: Transform[] = new Array(len);
  const interpolateList: Transform[] = new Array(len);

  const reverse = domain[0] > domain[len];
  const ascendingDomain = reverse ? [...domain].reverse() : domain;
  const ascendingRange = reverse ? [...range].reverse() : range;

  // 每一段都生成 normalize 和 interpolate
  for (let i = 0; i < len; i += 1) {
    normalizeList[i] = createNormalize(ascendingDomain[i], ascendingDomain[i + 1]);
    interpolateList[i] = createInterpolate(ascendingRange[i], ascendingRange[i + 1]);
  }

  // 二分最右查找到相应的 normalize 和 interpolate
  return (x: number): number => {
    const i = bisect(domain, x, 1, len) - 1;
    const normalize = normalizeList[i];
    const interpolate = interpolateList[i];
    return compose(interpolate, normalize)(x);
  };
};

/** 选择一个分段映射的函数 */
const choosePiecewise: CreateTransform = (domain, range, interpolate, shouldRound?) => {
  const n = Math.min(domain.length, range.length);
  const createPiecewise = n > 2 ? createPolyMap : createBiMap;
  const createInterpolate = shouldRound ? createInterpolateRound : interpolate;
  return createPiecewise(domain, range, createInterpolate);
};

/**
 * Continuous 比例尺 的输入 x 和输出 y 满足：y = a * f(x) + b
 * 通过函数柯里化和复合函数可以在映射过程中去掉分支，提高性能。
 * 参考：https://github.com/d3/d3-scale/blob/master/src/continuous.js
 */
export abstract class Continuous<O extends ContinuousOptions> extends Base<O> {
  /** 实际上将 x 映射为 y 的函数 */
  protected output: Transform;

  /** 实际上将 y 映射为 x 的函数 */
  protected input: Transform;

  /**
   * 根据比例尺 和 options 选择对应的 transform 和 untransform 函数
   * y = a * f(x) + b
   * x = a * f'(y) + b
   * @returns [f(x), f'(y)]
   */
  protected abstract chooseTransforms(): Transform[];

  protected getDefaultOptions() {
    return {
      domain: [0, 1],
      range: [0, 1],
      nice: false,
      clamp: false,
      round: false,
      interpolate: createInterpolate,
      tickCount: 5,
    } as O;
  }

  /**
   * y = interpolate(normalize(transform(clamp(x))))
   */
  public map(x: Domain<O>) {
    if (!isNumber(x) || Number.isNaN(x)) return this.options.unknown;
    return this.output(x);
  }

  /**
   * x = clamp(untransform(interpolate(normalize(y))))
   */
  public invert(x: Range<O>) {
    if (!isNumber(x) || Number.isNaN(x)) return this.options.unknown;
    return this.input(x);
  }

  protected nice() {
    const { nice, domain } = this.options;
    if (nice) {
      this.options.domain = d3LinearNice(domain);
    }
  }

  protected rescale() {
    this.nice();
    const clamp = this.chooseClamp();
    const [transform, untransform] = this.chooseTransforms();
    this.composeOutput(transform, clamp);
    this.composeInput(transform, untransform, clamp);
  }

  protected chooseClamp() {
    const { clamp: shouldClamp, domain, range } = this.options;
    const n = Math.min(domain.length, range.length);
    return shouldClamp ? createClamp(domain[0], domain[n - 1]) : identity;
  }

  protected composeOutput(transform: Transform, clamp: Transform) {
    const { domain, range, round, interpolate } = this.options;
    const piecewise = choosePiecewise(domain.map(transform), range, interpolate, round);
    this.output = compose(piecewise, transform, clamp);
  }

  protected composeInput(transform: Transform, untransform: Transform, clamp: Transform) {
    const { domain, range, interpolate } = this.options;
    const piecewise = choosePiecewise(range, domain.map(transform), interpolate);
    this.input = compose(clamp, untransform, piecewise);
  }

  public getTicks() {
    const { tickCount, tickMethod, domain } = this.options;
    const lastIndex = domain.length - 1;
    const dMin = domain[0];
    const dMax = domain[lastIndex];
    return tickMethod(dMin, dMax, tickCount);
  }
}
