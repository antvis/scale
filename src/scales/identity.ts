import { isNumber } from '@antv/util';
import { Base } from './base';
import { IdentityOptions, Domain, Range } from '../types';
import { ticks } from '../tick-method/basic';

export class Identity extends Base<IdentityOptions> {
  /**
   * 返回需要覆盖的默认选项
   * @returns 需要覆盖的默认选项
   */
  protected getOverrideDefaultOptions() {
    return {
      tickCount: 5,
      tickMethod: ticks,
    };
  }

  /**
   * 输入和输出满足：y = x
   * @param x 输入值
   * @returns 输出值
   */
  public map(x: Domain<IdentityOptions>) {
    return isNumber(x) && !Number.isNaN(x) ? x : this.options.unknown;
  }

  /**
   * map 的逆运算：x = y，在这里和 map 是相同方法
   * @param x 输出值
   * @returns 输入值
   */
  public invert(x: Range<IdentityOptions>) {
    return this.map(x);
  }

  /**
   * 克隆 Identity Scale
   * @returns 拥有相同选项且独立的 Identity Scale
   */
  public clone() {
    return new Identity(this.options);
  }

  /**
   * 根据比例尺的配置去生成 ticks，该 ticks 主要用于生成坐标轴
   * @returns 返回一个 ticks 的数组
   */
  public getTicks(): Range<IdentityOptions>[] {
    return this.options.tickMethod(this.options);
  }
}
