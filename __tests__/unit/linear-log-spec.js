import { expect } from 'chai';
import Log from '../../src/linear-log';

describe('log scale', function() {
  const scale = new Log({
    min: 1,
    max: 100,
  });

  it('type', function() {
    expect(scale.type).to.be.equal('log');
  });

  it('config', () => {
    expect(scale.min).to.be.equal(1);
    expect(scale.max).to.be.equal(100);
    expect(scale.base).to.be.equal(10);
  });

  it('scale func', () => {
    expect(scale.scale(10)).to.be.equal(0.5);
    expect(scale.scale(50)).to.be.equal(Math.log(50) / Math.log(100));
    expect(scale.scale(1)).to.be.equal(0);
    expect(scale.scale(100)).to.be.equal(1);
  });

  it('invert func', () => {
    expect(scale.invert(0)).to.be.equal(1);
    expect(scale.invert(0.5)).to.be.equal(10);
    expect(scale.invert(Math.log(50) / Math.log(100))).to.be.closeTo(50, 0.001); // 50.00000000000001
    expect(scale.invert(1)).to.be.equal(100);
  });
});

describe('log scale with log(0)', function() {
  it('scale for c(0, 100)', () => {
    const scale = new Log({
      min: 0,
      max: 100,
    });
    expect(scale.scale(10)).to.be.NaN;
    expect(scale.scale(50)).to.be.NaN;
    expect(scale.scale(100)).to.be.NaN;
  });

  it('scale for c(-10, 100)', () => {
    const scale = new Log({
      min: -10,
      max: 100,
    });
    expect(scale.scale(-10)).to.be.NaN;
    expect(scale.scale(0)).to.be.NaN;
    expect(scale.scale(100)).to.be.NaN;
  });
});

describe('log scale with negative values', function() {
  const scale = new Log({
    min: -256,
    max: -1,
    base: 2,
  });

  it('scale func', () => {
    expect(scale.scale(-256)).to.be.equal(0);
    expect(scale.scale(-16)).to.be.equal(0.5);
    expect(scale.scale(-1)).to.be.equal(1);
  });

  it('invert func', () => {
    expect(scale.invert(0)).to.be.equal(-256);
    expect(scale.invert(0.5)).to.be.equal(-16);
    expect(scale.invert(1)).to.be.equal(-1);
  });
});

describe('log scale with specified range', function() {
  const scale = new Log({
    min: 1,
    max: 100,
    range: [ 0, 10 ],
  });

  it('config', () => {
    expect(scale.range).to.be.eql([ 0, 10 ]);
  });

  it('scale func', () => {
    expect(scale.scale(10)).to.be.equal(5);
    expect(scale.scale(50)).to.be.closeTo(8.49485, 0.00001);
    expect(scale.scale(1)).to.be.equal(0);
    expect(scale.scale(100)).to.be.equal(10);
  });

  it('invert func', () => {
    expect(scale.invert(0)).to.be.equal(1);
    expect(scale.invert(5)).to.be.equal(10);
    expect(Math.round(scale.invert(8.49485))).to.be.equal(50);
    expect(scale.invert(10)).to.be.equal(100);
  });
});
