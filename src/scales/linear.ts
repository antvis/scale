import { identity } from '@antv/util';
import { Continuous, Transform } from './continuous';
import { LinearOptions } from '../types';
import { Base } from './base';
import { createInterpolate } from '../utils';
import { d3Linear } from '../tick-methods/d3-linear';

/**
 * Linear 比例尺
 *
 * 构造可创建一个在输入和输出之间具有线性关系的比例尺
 */
export class Linear extends Continuous<LinearOptions> {
  protected getDefaultOptions(): LinearOptions {
    return {
      domain: [0, 1],
      range: [0, 1],
      unknown: undefined,
      nice: false,
      clamp: false,
      round: false,
      interpolate: createInterpolate,
      tickMethod: d3Linear,
      tickCount: 5,
    };
  }

  protected chooseTransforms(): Transform[] {
    return [identity, identity];
  }

  public clone(): Base<LinearOptions> {
    return new Linear(this.options);
  }
}
