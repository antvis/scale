const Base = require('./base');
const isNumber = require('@antv/util/src/type/isNumber');

class Identity extends Base {

  _initDefaultCfg() {
    this.isIdentity = true;
    this.type = 'identity';
    /**
     * 输出的值域
     * @type {Array}
     */
    this.range = [ 0, 1 ];
    // /**
    //  * 常量值
    //  * @type {*}
    //  */
    // this.value = null;
    /**
     * 参与度量计算的值，可选项
     * @type {Array}
     */
    this.values = [];
  }

  /**
   * @override
   */
  getText() {
    return this.value.toString();
  }

  /**
   * @override
   */
  scale(value) {
    if (this.value !== value && isNumber(value)) {
      return value;
    }
    return this.range[0];
  }

  /**
   * @override
   */
  invert() {
    return this.value;
  }
}

Base.Identity = Identity;
module.exports = Identity;
