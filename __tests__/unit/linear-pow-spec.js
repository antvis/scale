import { expect } from 'chai';
import Pow from '../../src/linear-pow';

describe('pow scale', function() {
  const scale = new Pow({
    min: 0,
    max: 100,
    exponent: 0.5,
  });

  it('type', function() {
    expect(scale.type).to.be.equal('pow');
  });

  it('config', () => {
    expect(scale.min).to.be.equal(0);
    expect(scale.max).to.be.equal(100);
    expect(scale.exponent).to.be.equal(0.5);
  });

  it('scale func', () => {
    expect(scale.scale(25)).to.be.equal(0.5);
    expect(scale.scale(50)).to.be.equal(Math.sqrt(0.5));
    expect(scale.scale(0)).to.be.equal(0);
    expect(scale.scale(100)).to.be.equal(1);
  });

  it('invert func', () => {
    expect(scale.invert(0)).to.be.equal(0);
    expect(scale.invert(0.5)).to.be.equal(25);
    expect(scale.invert(Math.sqrt(0.5))).to.be.closeTo(50, 0.001); // 50.00000000000001
    expect(scale.invert(1)).to.be.equal(100);
  });

  it('ticks', () => {
    expect(scale.ticks).to.be.eqls([ 0, 25, 50, 75, 100 ]);
  });
});

describe('pow scale with negative values', () => {
  const scale = new Pow({
    min: -100,
    max: 0,
    exponent: 0.5,
  });

  it('scale func', () => {
    expect(scale.scale(-100)).to.be.equal(0);
    expect(scale.scale(-25)).to.be.equal(0.5);
    expect(scale.scale(-50)).to.be.equal(1 - Math.sqrt(0.5));
    expect(scale.scale(0)).to.be.equal(1);
  });

  it('invert func', () => {
    expect(scale.invert(0)).to.be.equal(-100);
    expect(scale.invert(0.5)).to.be.equal(-25);
    expect(scale.invert(1 - Math.sqrt(0.5))).to.be.closeTo(-50, 0.001); // -50.00000000000001
    expect(scale.invert(1)).to.be.equal(0);
  });
});
