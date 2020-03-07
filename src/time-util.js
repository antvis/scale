/**
 * @fileOverview 提取公共代码到util方法
 * @author dxq613@gmail.com
 */

const isString = require('@antv/util/lib/type/is-string');
const isDate = require('@antv/util/lib/type/is-date');
const timeReg = /^\d{8}$/;
module.exports = {
  toTimeStamp(value) {
    if (isString(value)) {
      if (timeReg.test(value)) {
        const year = parseInt(value.substr(0, 4));
        const month = parseInt(value.substr(4, 2)) - 1; // 1月在日期函数里面是 0
        const date = parseInt(value.substr(6, 2));
        value = new Date(year, month, date).getTime();
      } else if (value.indexOf('T') > 0) {
        value = new Date(value).getTime();
      } else {
        value = new Date(value.replace(/-/ig, '/')).getTime();
      }
    }
    if (isDate(value)) {
      value = value.getTime();
    }
    return value;
  }
};
