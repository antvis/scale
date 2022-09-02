import { isNumber } from '@antv/util';
import { CreateTransform, Transform, Interpolator } from '../types';
import { compose } from './compose';

const createInterpolatorRound = (interpolator: Interpolator) => {
  return (t: number) => {
    // If result is not number, it can't be rounded.
    const res = interpolator(t);
    return isNumber(res) ? Math.round(res) : res;
  };
};

export function interpolatize(rangeOf: (interpolator: Interpolator) => number[], normalizeDomain: CreateTransform) {
  return (Scale) => {
    Scale.prototype.rescale = function () {
      this.initRange();
      this.nice();
      const [transform] = this.chooseTransforms();
      this.composeOutput(transform, this.chooseClamp(transform));
    };

    Scale.prototype.initRange = function () {
      const { interpolator } = this.options;
      this.options.range = rangeOf(interpolator);
    };

    Scale.prototype.composeOutput = function (transform: Transform, clamp: Transform) {
      const { domain, interpolator, round } = this.getOptions();
      const normalize = normalizeDomain(domain.map(transform));
      const interpolate = round ? createInterpolatorRound(interpolator) : interpolator;
      this.output = compose(interpolate, normalize, clamp, transform);
    };

    Scale.prototype.invert = undefined;
  };
}
