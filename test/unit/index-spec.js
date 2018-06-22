const expect = require('chai').expect;
const Scale = require('../../src/index');

describe('sample', () => {
  it('Scale', () => {
    expect(Scale).to.include.all.keys('Linear', 'Identity', 'Cat', 'Time', 'TimeCat', 'Log', 'Pow');
    expect(Scale.linear).to.be.an.instanceof(Function);
  });

  it('Scale.isCategory', () => {
    expect(Scale.isCategory('cat')).to.be.true;
    expect(Scale.isCategory('timeCat')).to.be.true;
    expect(Scale.isCategory('time')).to.be.false;
  });
});
