import { Continuous, Transform } from './continuous';
import { LinearOptions } from '../types';
import { Base } from './base';

export function getPercent(value: number, range: number[]) {
  const [rangeMin, rangeMax] = range;
  return (value - rangeMin) / (rangeMax - rangeMin);
}

export class Linear extends Continuous<LinearOptions> {
  protected chooseTransform(): Transform {
    return (x: number) => {
      // 获取 domain 占比
      const p = getPercent(x, this.options.domain);
      const [rMin, rMax] = this.options.range;
      return rMin + p * (rMax - rMin);
    };
  }

  protected chooseUntransform(): Transform {
    return (y: number) => {
      const p = getPercent(y, this.options.range);
      const [dMin, dMax] = this.options.domain;
      return dMin + p * (dMax - dMin);
    };
  }

  // eslint-disable-next-line no-useless-constructor
  constructor(options: LinearOptions) {
    super(options);
  }

  clone(): Base<LinearOptions> {
    return undefined;
  }

  protected nice() {}
}
