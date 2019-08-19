import { expect } from 'chai';
import Linear from '../../src/linear';

describe('linear scale', () => {
  const scale = new Linear({
    min: 0,
    max: 100,
    formatter(val) {
      return val + '元';
    },
  });

  it('type', function() {
    expect(scale.type).to.be.equal('linear');
    expect(scale.isLinear).to.be.true;
  });

  it('config', () => {
    expect(scale.min).to.be.equal(0);
    expect(scale.max).to.be.equal(100);
    expect(scale.type).to.be.equal('linear');
  });

  it('scale func', () => {
    expect(scale.scale(50)).to.be.equal(0.5);
    expect(scale.scale(0)).to.be.equal(0);
    expect(scale.scale(100)).to.be.equal(1);
    expect(scale.scale(null)).to.be.NaN;
  });

  it('invert func', () => {
    expect(scale.invert(0)).to.be.equal(0);
    expect(scale.invert(0.5)).to.be.equal(50);
    expect(scale.invert(1)).to.be.equal(100);
  });

  it('getText func', () => {
    expect(scale.getText(5)).to.be.equal('5元');
  });

  it('getTicks func', () => {
    const ticks = scale.getTicks();
    expect(ticks.length).not.to.be.equal(0);
    expect(ticks[0].value).to.be.equal(0);
    expect(ticks[ticks.length - 1].value).to.be.equal(1);
  });

  it('change func', () => {
    scale.change({
      min: 10,
      max: 110,
      nice: false,
    });
    expect(scale.scale(60)).to.be.equal(0.5);
  });
});

describe('linear scale for c(0, 10, 100)', () => {
  const scale = new Linear({
    values: [ 0, 10, 100 ],
  });

  it('config', () => {
    expect(scale.min).to.equal(0);
    expect(scale.max).to.equal(100);
  });

  it('translate func', () => {
    expect(scale.translate(10)).to.equal(10);
  });

  it('scale func', () => {
    expect(scale.scale(110)).to.equal(1);
    expect(scale.scale(-50)).to.equal(0);
  });
});

describe('linear scale for specified range', () => {
  const scale = new Linear({
    min: 0,
    max: 100,
    range: [ 0, 1000 ],
  });

  it('scale func', () => {
    expect(scale.scale(50)).to.be.equal(500);
    expect(scale.scale(0)).to.be.equal(0);
    expect(scale.scale(100)).to.be.equal(1000);
  });

  it('invert func', () => {
    expect(scale.invert(0)).to.be.equal(0);
    expect(scale.invert(500)).to.be.equal(50);
    expect(scale.invert(1000)).to.be.equal(100);
  });
});

describe('linear scale multiple times', () => {
  const scale = new Linear({
    min: 21,
    max: 145,
  });

  it('1st time', () => {
    expect(scale.ticks).to.be.eql([ 0, 50, 100, 150 ]);
  });

  it('2nd time', () => {
    scale.change({ min: 0 });
    expect(scale.ticks).to.be.eql([ 0, 50, 100, 150 ]);
  });
});

describe('linear scale for invalid min and max', () => {
  it('min > max', () => {
    const scale = new Linear({
      min: 100,
      max: 0,
      values: [ 10, 20, 30 ],
    });
    expect(scale.min).to.equal(10);
    expect(scale.max).to.equal(30);
  });

  it('min = max', () => {
    const scale = new Linear({
      values: [ 10 ],
    });
    expect(scale.ticks).to.eql([ 10 ]);
  });
});

describe('linear scale with minInterval', () => {
  it('c(0, 62), minInterval = 14', () => {
    const scale = new Linear({
      min: 0,
      max: 62,
      minTickInterval: 14,
    });
    expect(scale.ticks).to.eql([ 0, 14, 28, 42, 56, 70 ]);
  });
});
