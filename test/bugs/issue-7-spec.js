const expect = require('chai').expect;
const auto = require('../../src/auto/number');

describe('#7', () => {
  it('linear ticks, tickCount is 4', () => {
    const rst = auto({
      min: 22.57,
      max: 56.23,
      minCount: 4,
      maxCount: 4
    });
    expect(rst.ticks).eql([ 12, 24, 36, 48, 60 ]);
  });
});
