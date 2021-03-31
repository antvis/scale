import { isNumber } from '@antv/util';
import Base from './base';
import { IdentityOptions } from '../types';

export class Identity extends Base<IdentityOptions> {
  /**
   * 输入和输出满足：y = x
   * @param x 输入值
   * @returns 输出值
   */
  public map(x: number) {
    return isNumber(x) && !Number.isNaN(x) ? x : this.options.unknown;
  }

  /**
   * map 的逆运算：x = y，在这里和 map 是相同方法
   * @param x 输出值
   * @returns 输入值
   */
  public invert(x: number) {
    return this.map(x);
  }

  /**
   * 克隆 Identity Scale
   * @returns 拥有相同选项且独立的 Identity Scale
   */
  public clone() {
    return new Identity(this.options);
  }
}
