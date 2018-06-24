const Base = require('./base');
const catAuto = require('./auto/cat');
const each = require('@antv/util/src/each');
const isNumber = require('@antv/util/src/type/isNumber');
const isString = require('@antv/util/src/type/isString');

class Category extends Base {

  _initDefaultCfg() {
    super._initDefaultCfg();
    this.type = 'cat';
    /**
     * 是否分类度量
     * @type {Boolean}
     */
    this.isCategory = true;
  }

  /**
   * @override
   */
  init() {
    const self = this;
    const values = self.values;
    const tickCount = self.tickCount;

    each(values, (v, i) => {
      values[i] = v.toString();
    });
    if (!self.ticks) {
      let ticks = values;
      if (tickCount) {
        const temp = catAuto({
          maxCount: tickCount,
          data: values
        });
        ticks = temp.ticks;
      }
      this.ticks = ticks;
    }
  }

  /**
   * @override
   */
  getText(value) {
    if (this.values.indexOf(value) === -1 && isNumber(value)) {
      value = this.values[Math.round(value)];
    }

    return super.getText.call(this, value);
  }

  /**
   * @override
   */
  translate(value) {
    let index = this.values.indexOf(value);
    if (index === -1 && isNumber(value)) {
      index = value;
    } else if (index === -1) {
      index = NaN;
    }
    return index;
  }
  /**
   * @override
   */
  scale(value) {
    const rangeMin = this.rangeMin();
    const rangeMax = this.rangeMax();
    let percent;

    if (isString(value) || this.values.indexOf(value) !== -1) {
      value = this.translate(value);
    }
    if (this.values.length > 1) {
      percent = (value) / (this.values.length - 1);
    } else {
      percent = value;
    }
    return rangeMin + percent * (rangeMax - rangeMin);
  }

  /**
   * @override
   */
  invert(value) {
    if (isString(value)) { // 如果已经是字符串
      return value;
    }
    const min = this.rangeMin();
    const max = this.rangeMax();

    // 归一到 范围内
    if (value < min) {
      value = min;
    }
    if (value > max) {
      value = max;
    }
    const percent = (value - min) / (max - min);
    let index = Math.round(percent * (this.values.length - 1)) % this.values.length;
    index = index || 0;
    return this.values[index];
  }
}

Base.Cat = Category;
module.exports = Category;
