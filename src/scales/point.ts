import { clone } from '@antv/util';
import { Band } from './band';
import { PointOptions } from '../types';

export class Point extends Band {
  // 覆盖默认配置
  protected getOverrideDefaultOptions() {
    return {
      domain: [],
      range: [0, 1],
      align: 0.5,
      round: false,
      paddingInner: 1,
      paddingOuter: 0,
      padding: 0,
      unknown: undefined,
    };
  }

  public clone() {
    return new Point(clone(this.getOptions()));
  }

  getOptions() {
    return this.options as PointOptions;
  }
}
