import { identity, isNumber } from '@antv/util';
import { d3Ticks } from '../tick-methods/d3-ticks';
import { Interpolator, DivergingOptions } from '../types';
import { bisect, compose, createInterpolateNumber, createNormalize } from '../utils';
import { CreateTransform, Transform } from './continuous';
import { Linear } from './linear';

// Modify interface exposed by Diverging.
export interface Diverging {
  invert: undefined;
  getOptions(): DivergingOptions;
  update(updateOptions: Partial<DivergingOptions>): void;
}

const createInterpolatorRound = (interpolator: Interpolator) => {
  return (t: number) => {
    // If result is not number, it can't be rounded.
    const res = interpolator(t);
    return isNumber(res) ? Math.round(res) : res;
  };
};

const createNormalizeCompose: CreateTransform = (domain) => {
  const [d0, d1, d2] = domain;
  // [d0, d1] => [0, 0.5]
  const normalizeLeft: Transform = compose(createInterpolateNumber(0, 0.5), createNormalize(d0, d1));
  // [d1, d2] => [0.5, 1]
  const normalizeRight: Transform = compose(createInterpolateNumber(0.5, 1), createNormalize(d1, d2));

  const normalizeList: Transform[] = [normalizeLeft, normalizeRight];

  return (x: number): number => {
    const i = bisect(domain, x, 1, domain.length - 1) - 1;
    const normalize = normalizeList[i];
    return normalize(x);
  };
};

function Divergingish(Scale) {
  Scale.prototype.rescale = function () {
    this.initRange();
    this.nice();
    const [transform] = this.chooseTransforms();
    this.composeOutput(transform, this.chooseClamp(transform));
  };

  Scale.prototype.initRange = function () {
    const { interpolator } = this.getOptions();
    this.options.range = [interpolator(0), interpolator(0.5), interpolator(1)];
  };

  Scale.prototype.composeOutput = function (transform: Transform, clamp: Transform) {
    const { domain, interpolator, round } = this.getOptions();
    const normalize = createNormalizeCompose(domain.map(transform));
    const interpolate = round ? createInterpolatorRound(interpolator) : interpolator;
    this.output = compose(interpolate, normalize, clamp, transform);
  };

  Scale.prototype.invert = undefined;
}

/**
 * Diverging 比例尺
 *
 * 构造可创建一个在输入和输出之间通过插值函数进行转换的比例尺
 */
@Divergingish
export class Diverging extends Linear {
  protected getDefaultOptions(): DivergingOptions {
    return {
      domain: [0, 0.5, 1],
      unknown: undefined,
      nice: false,
      clamp: false,
      round: false,
      interpolator: identity,
      tickMethod: d3Ticks,
      tickCount: 5,
    };
  }

  constructor(options?: DivergingOptions) {
    super(options);
  }

  public clone() {
    return new Diverging(this.options);
  }
}
