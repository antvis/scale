import { isNumber, identity } from '@antv/util';
import { Base } from './base';
import { ContinuousOptions, Domain, Range } from '../types';
import { createInterpolate, createInterpolateRound, createClamp, createNormalize, bisect, compose } from '../utils';

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

/** 选择一个固定输入的函数 */
const chooseClamp: CreateTransform = (domain, range, shouldClamp) => {
  const n = Math.min(domain.length, range.length);
  return shouldClamp ? createClamp(domain[0], domain[n - 1]) : identity;
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
 * 对于该类比例尺，根据配置选项的不同会在映射过程中存在一系列分支，
 * 在数据量大的情况下这是很影响性能的，
 * 所以通过函数柯里化和复合函数可以在映射过程中去掉分支，
 * 这样当配置选项更新的时候需要重新合成函数。
 * 参考：https://github.com/d3/d3-scale/blob/master/src/continuous.js
 */
export abstract class Continuous<O extends ContinuousOptions> extends Base<O> {
  /** 实际上将 x 映射为 y 的函数 */
  protected output: Transform;

  /** 实际上将 y 映射为 x 的函数 */
  protected input: Transform;

  /** 在设置了选项后对 domain 进行优化 */
  protected abstract nice(): void;

  /** 从 domain 获得 ticks */
  protected abstract getTicks(): Domain<O>[];

  /**
   * 根据比例尺 和 options 选择对应的 transform 函数
   * y = a * f(x) + b 中的 f(x)
   */
  protected abstract chooseTransform(): Transform;

  /**
   * 根据比例尺 和 options 选择对应的 untransform 函数
   * x = a * f'(y) + b 中的 f'(y)
   */
  protected abstract chooseUntransform(): Transform;

  protected getOverrideDefaultOptions() {
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

  public map(x: Domain<O>) {
    if (!isNumber(x) || Number.isNaN(x)) return this.options.unknown;
    if (!this.output) this.composeOutput();
    return this.output(x);
  }

  public invert(x: Range<O>) {
    if (!isNumber(x) || Number.isNaN(x)) return this.options.unknown;
    if (!this.input) this.composeInput();
    return this.input(x);
  }

  /**
   * 这里只要有选项更新，就是清除 input 和 output 函数。
   *
   * 更好的做法是，只有依赖选项更新时才清除 input 和 output 函数，
   * 但是得到 input 和 output 的函数开销很小，所以这里选择简单的写法。
   *
   * 子类在这个函数中可能更新 transform 和 untransform
   * @param options 更新的选项
   */
  public update(options?: Partial<O>) {
    super.update(options);
    this.input = undefined;
    this.output = undefined;
  }

  protected niceDomain() {
    if (this.options.nice) {
      this.nice();
    }
  }

  /**
   * y = interpolate(normalize(transform(clamp(x))))
   * clamp: x: [a, b] -> x: [d0, d1]
   * transform: x: [d0, d1] -> x = f(x) : [f(d0),f(d1)]
   * normalize: x: [f(d0), f(d1)] -> t: [0, 1]
   * interpolate: t: [0, 1] -> y: [r0, r1]
   */
  protected composeOutput() {
    this.niceDomain();
    const { clamp: shouldClamp, domain, round, range, interpolate } = this.options;
    const clamp = chooseClamp(domain, range, shouldClamp);
    const transform = this.chooseTransform();
    const piecewise = choosePiecewise(domain.map(transform), range, interpolate, round);
    this.output = compose(piecewise, transform, clamp);
  }

  /**
   * x = clamp(untransform(interpolate(normalize(y))))
   * normalize: y: [a, b] -> t: [0, 1]
   * interpolate: t: [0, 1] -> x: [f(c), f(d)]
   * untransform: x: [f(c), f(d)] -> x = f'(x) : [c, d]
   * clamp: x: [c, d] -> x: [d0, d1]
   */
  protected composeInput() {
    this.niceDomain();
    const { clamp: shouldClamp, domain, range, interpolate } = this.options;
    const clamp = chooseClamp(domain, range, shouldClamp);
    const untransform = this.chooseUntransform();
    const transform = this.chooseTransform();
    const piecewise = choosePiecewise(range, domain.map(transform), interpolate);
    this.input = compose(clamp, untransform, piecewise);
  }
}
