import { each, head, last } from '@antv/util';
import Continuous from './base';

/**
 * 分段度量
 */
class Quantize extends Continuous {
  public type = 'quantize';
  public nice: boolean = true;
  public tickCount = 5;
  public tickMethod = 'r-pretty';

  public invert(value): number {
    const ticks = this.ticks;
    const length = ticks.length;
    const percent = this.getInvertPercent(value);
    const minIndex = Math.floor(percent * (length - 1));
    // 最后一个
    if (minIndex >= length - 1) {
      return last(ticks);
    }
    // 超出左边界， 则取第一个
    if (minIndex < 0) {
      return head(ticks);
    }
    const minTick = ticks[minIndex];
    const nextTick = ticks[minIndex + 1];
    // 比当前值小的 tick 在度量上的占比
    const minIndexPercent = minIndex / (length - 1);
    return minTick + (percent - minIndexPercent) * (nextTick - minTick);
  }

  // 计算当前值在刻度中的占比
  protected getScalePercent(value) {
    const ticks = this.ticks;
    // 超出左边界
    if (value < head(ticks)) {
      return 0;
    }
    // 超出右边界
    if (value > last(ticks)) {
      return 1;
    }
    let minIndex = 0;
    each(ticks, (tick, index) => {
      if (value >= tick) {
        minIndex = index;
      } else {
        return false;
      }
    });
    return minIndex / (ticks.length - 1);
  }
}

export default Quantize;
