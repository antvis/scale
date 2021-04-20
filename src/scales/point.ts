import { Band } from './band';
import { PointOptions } from '../types';

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
      padding: 0,
      unknown: undefined,
      paddingOuter: 0,
      paddingInner: 1,
    };
  }

  public clone() {
    return new Point(this.options);
  }

  protected getPaddingInner() {
    return 1;
  }

  protected getPaddingOuter() {
    return this.options.padding;
  }
}
