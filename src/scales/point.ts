import { clone } from '@antv/util';
import { Band, getBandState } from './band';
import { BandOptions, PointOptions } from '../types';

export class Point extends Band<PointOptions> {
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

  // eslint-disable-next-line
  constructor(options?: PointOptions) {
    super(options);
  }

  public clone() {
    return new Point(clone(this.getOptions()));
  }

  protected getBandState(bandOption: BandOptions) {
    // 覆写 paddingOuter
    // 因为新的选项的 padding 就是 paddingOuter，且 paddingInner 是定死的
    const { align, domain, padding, range, round, paddingInner } = bandOption;

    return getBandState({
      align,
      range,
      round,
      paddingInner,
      paddingOuter: padding,
      stepAmount: domain.length,
    });
  }

  getOptions() {
    return this.options;
  }
}
