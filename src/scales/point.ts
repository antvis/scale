import { Band } from './band';
import { PointOptions, BandOptions } from '../types';

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
export class Point extends Band<PointOptions & BandOptions> {
  // 覆盖默认配置
  protected getOverrideDefaultOptions() {
    return {
      domain: [],
      range: [0, 1],
      align: 0.5,
      round: false,
      padding: 0,
      unknown: undefined,
      paddingInner: 1,
      paddingOuter: 0,
    };
  }

  constructor(options?: Partial<PointOptions>) {
    super(options);
  }

  protected getPaddingInner() {
    return this.options.paddingInner;
  }

  public clone() {
    return new Point(this.options);
  }

  public update(options?: Partial<PointOptions>) {
    super.update(options);
  }

  protected getPaddingOuter() {
    return this.options.padding;
  }
}
