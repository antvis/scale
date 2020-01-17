import { filter, getRange, isNil, head, last } from '@antv/util';
import Base from '../base';

/**
 * 连续度量的基类
 * @class
 */
export default abstract class Continuous extends Base {
  public isContinuous?: boolean = true;
  public nice: boolean;

  public scale(value: any): number {
    if (isNil(value)) {
      return NaN;
    }
    const rangeMin = this.rangeMin();
    const rangeMax = this.rangeMax();
    const max = this.max;
    const min = this.min;
    if (max === min) {
      return rangeMin;
    }
    const percent = this.getScalePercent(value);
    return rangeMin + percent * (rangeMax - rangeMin);
  }

  protected setDomain() {
    const { min, max } = getRange(this.values);
    if (isNil(this.min)) {
      this.min = min;
    }
    if (isNil(this.max)) {
      this.max = max;
    }
    if (this.min > this.max) {
      this.min = min;
      this.max = max;
    }
  }

  protected calculateTicks(): any[] {
    let ticks = super.calculateTicks();
    if (!this.nice) {
      ticks = filter(ticks, (tick) => {
        return tick >= this.min && tick <= this.max;
      });
    } else { // nice = true 时，矫正 min ,max
      const firstTick = head(ticks);
      const lastTick = last(ticks);
      if (firstTick < this.min) {
        this.min = firstTick;
      }
      if (lastTick > this.max) {
        this.max = lastTick;
      }
    }
    return ticks;
  }

  // 计算原始值值占的百分比
  protected getScalePercent(value) {
    const max = this.max;
    const min = this.min;
    return (value - min) / (max - min);
  }

  protected getInvertPercent(value) {
    return (value - this.rangeMin()) / (this.rangeMax() - this.rangeMin());
  }
}
