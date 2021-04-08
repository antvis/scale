import { ConstantOptions, Domain, Range } from '../types';
import { Base } from './base';
import { ticks } from '../tick-method/basic';

export class Constant extends Base<ConstantOptions> {
  /**
   * 返回需要覆盖的默认选项
   * @returns 需要覆盖的默认选项
   */
  protected getOverrideDefaultOptions() {
    return {
      range: [0],
      tickCount: 5,
      tickInterval: 10,
      tickMethod: ticks,
    };
  }

  /**
   * 输入和输出满足：y = b，其中 b 是一个常量，是 options.range 的第一个元素
   * @param _ 输入值
   * @returns 输出值（常量）
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public map(_: Domain<ConstantOptions>) {
    const [v] = this.options.range;
    return v !== undefined ? v : this.options.unknown;
  }

  /**
   * 如果 x 是该比例尺的常量（x === b），返回输入值的范围（即定义域），否者返回 []
   * @param x 输出值 (常量）
   * @returns 定义域
   */
  public invert(x: Range<ConstantOptions>) {
    const [v] = this.options.range;
    return x === v && v !== undefined ? this.options.domain : [];
  }

  /**
   * 克隆 Constant Scale
   * @returns 拥有相同选项且独立的 Constant Scale
   */
  public clone() {
    return new Constant(this.options);
  }

  /**
   * 根据比例尺的配置去生成 ticks，该 ticks 主要用于生成坐标轴
   * @returns 返回一个 ticks 的数组
   */
  public getTicks(): Range<ConstantOptions>[] {
    return this.options.tickMethod(this.options);
  }
}
