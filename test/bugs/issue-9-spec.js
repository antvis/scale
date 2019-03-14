const expect = require('chai').expect;
const auto = require('../../src/auto/number');

describe('#9', () => {
  it('linear ticks, tickCount is 6', () => {
    const rst = auto({
      min: 0,
      max: 1080,
      minCount: 6,
      maxCount: 6
    });
    expect(rst.ticks).eql([ 0, 220, 440, 660, 880, 1100 ]);
  });
});
