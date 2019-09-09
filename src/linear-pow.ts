import Linear from './linear';

export default class Pow extends Linear {
  public exponent: number;

  public invert(scaled: number): number {
    const res = super.invert(scaled);
    return res >= 0 ? Math.pow(res, 1 / this.exponent) : -Math.pow(-res, 1 / this.exponent);
  }

  protected _initDefaultCfg() {
    this.type = 'pow';
    this.values = [];
    this.exponent = 1; // d3默认值为1
  }

  protected _init() {
    // todo pow breaks要优化
    this.ticks = this._setTicks();
  }

  protected _transform(v: number): number {
    return v >= 0 ? Math.pow(v, this.exponent) : -Math.pow(-v, this.exponent);
  }
}
