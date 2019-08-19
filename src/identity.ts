import * as _ from '@antv/util';
import Base from './base';

/**
 * identity scale原则上是定义域和值域一致，scale/invert方法也是一致的
 * 参考R的实现：https://github.com/r-lib/scales/blob/master/R/pal-identity.r
 * 参考d3的实现（做了下转型）：https://github.com/d3/d3-scale/blob/master/src/identity.js
 */
export default class Identity extends Base {
  get _unknown() {
    /**
     * 兼容G2:
     * 实现一维图形时，例如position中x不存在时，Identity的values为[]，
     * scale(undefined)的期望结果是值域最小值
     */
    if (_.has(this.__cfg__, 'unknown')) {
      return this.__cfg__.unknown;
    }
    return this.range[0];
  }
  public isIdentity: boolean;
  public values: number[];

  public scale(value: any): number {
    return this._scale(value);
  }

  public invert(scaled: number): number {
    return this._scale(scaled);
  }

  protected _initDefaultCfg() {
    this.type = 'identity';
    this.values = [];
    this.isIdentity = true;
  }

  protected _init() {}

  private _scale(value: number): number {
    if (_.isNumber(value)) {
      return value;
    }
    return this._unknown;
  }
}
