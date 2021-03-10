import { Pow } from '../../src';

describe('pow scale', function() {
  const scale = new Pow({
    min: 0,
    max: 100,
    exponent: 2,
  });

  it('type', function() {
    expect(scale.type).toEqual('pow');
  });

  it('config', () => {
    expect(scale.min).toEqual(0);
    expect(scale.max).toEqual(100);
    expect(scale.exponent).toEqual(2);
  });

  it('scale func', () => {
    expect(scale.scale(25)).toBeCloseTo(0.5, 0.1);
    expect(scale.scale(50)).toBeCloseTo(Math.sqrt(0.5));
    expect(scale.scale(0)).toEqual(0);
    expect(scale.scale(100)).toEqual(1);
  });

  it('invert func', () => {
    expect(scale.invert(0)).toEqual(0);
    expect(scale.invert(0.5)).toEqual(25);
    expect(scale.invert(Math.sqrt(0.5))).toBeCloseTo(50, 0.001); // 50.00000000000001
    expect(scale.invert(1)).toEqual(100);
  });

  it('ticks', () => {
    expect(scale.ticks).toEqual([ 0, 4, 16, 36, 64, 100 ]);
  });
});

describe('pow scale with negative values', () => {
  const scale = new Pow({
    min: -100,
    max: 0,
    exponent: 2,
  });

  it('scale func', () => {
    expect(scale.scale(-100)).toEqual(0);
    expect(scale.scale(-25)).toBeCloseTo(0.5);
    expect(scale.scale(-50)).toBeCloseTo(1 - Math.sqrt(0.5));
    expect(scale.scale(0)).toEqual(1);
  });

  it('invert func', () => {
    expect(scale.invert(0)).toEqual(-100);
    expect(scale.invert(0.5)).toEqual(-25);
    expect(scale.invert(1 - Math.sqrt(0.5))).toBeCloseTo(-50, 0.001); // -50.00000000000001
    expect(scale.invert(1)).toEqual(0);
  });
});
