import { Band, getBandState } from './band';
import { BandOptions, PointOptions } from '../types';

/**
 * Point 比例尺
 *
 * 一种特殊的 band scale，它的 bandWidth 恒为 0。
 *
 * 由于部分选项较为抽象，见下图描述：
 *
 * PO = Padding = PaddingInner
 * domain =  ["A", "B", "C"]
 *
 * |<------------------------------------------- range ------------------------------------------->|
 * |             |                                 |                                 |             |
 * |<--step*PO-->|<--------------step------------->|<--------------step------------->|<--step*PO-->|
 * |             |                                 |                                 |             |
 * |             A                                 B                                 C             |
 * |-----------------------------------------------------------------------------------------------|
 *
 * 性能方便较 d3 快出 8 - 9 倍
 */
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
    return new Point(this.options);
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
