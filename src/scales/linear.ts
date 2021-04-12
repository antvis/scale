import { clone } from '@antv/util';
import { Continuous, Transform } from './continuous';
import { LinearOptions } from '../types';
import { Base } from './base';
import { createInterpolate } from '../utils';
import { linerTick } from '../tick-method/linear';
import { d3LinearNice } from '../utils/d3-linear-nice';

/**
 * 给定一个序列和一个数字，获取该数字在该序列的百分比
 *
 * @param value 数字
 * @param range 序列
 */
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

  protected getOverrideDefaultOptions() {
    return {
      nice: false,
      clamp: false,
      round: false,
      interpolate: createInterpolate,
      tickMethod: linerTick,
      tickCount: 5,
    } as LinearOptions;
  }

  protected chooseUntransform(): Transform {
    return (y: number) => {
      const p = getPercent(y, this.options.range);
      const [dMin, dMax] = this.options.domain;
      return dMin + p * (dMax - dMin);
    };
  }

  constructor(options?: LinearOptions) {
    super(options);
  }

  clone(): Base<LinearOptions> {
    return new Linear(clone(this.options));
  }

  public nice() {
    const { domain } = this.options;
    this.options.domain = d3LinearNice(domain);
  }
}
