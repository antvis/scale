import { identity, isNumber } from '@antv/util';
import { d3Ticks } from '../tick-methods/d3-ticks';
import { Interpolator, SequentialOptions } from '../types';
import { compose } from '../utils';
import { CreateTransform, Transform } from './continuous';
import { Linear } from './linear';

// Modify interface exposed by Sequential.
export interface Sequential {
  invert: undefined;
  getOptions(): SequentialOptions;
  update(updateOptions: Partial<SequentialOptions>): void;
}

const createInterpolatorRound = (interpolator: Interpolator) => {
  return (t: number) => {
    // If result is not number, it can't be rounded.
    const res = interpolator(t);
    return isNumber(res) ? Math.round(res) : res;
  };
};

const createNormalizeCompose: CreateTransform = (domain) => {
  const [d0, d1] = domain;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const normalize: Transform = d1 - d0 ? (t: number) => (t - d0) / (d1 - d0) : (_: number) => 0.5;
  return normalize;
};

function Sequentialish(Scale) {
  Scale.prototype.rescale = function () {
    this.initRange();
    this.nice();
    const [transform] = this.chooseTransforms();
    this.composeOutput(transform, this.chooseClamp(transform));
  };

  Scale.prototype.initRange = function () {
    const { interpolator } = this.getOptions();
    this.options.range = [interpolator(0), interpolator(1)];
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
 * Sequential 比例尺
 *
 * 构造可创建一个在输入和输出之间通过插值函数进行转换的比例尺
 */
@Sequentialish
export class Sequential extends Linear {
  protected getDefaultOptions(): SequentialOptions {
    return {
      domain: [0, 1],
      unknown: undefined,
      nice: false,
      clamp: false,
      round: false,
      interpolator: identity,
      tickMethod: d3Ticks,
      tickCount: 5,
    };
  }

  constructor(options?: SequentialOptions) {
    super(options);
  }

  public clone() {
    return new Sequential(this.options);
  }
}
