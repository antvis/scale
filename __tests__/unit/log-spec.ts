import { Log } from '../../src';

describe('log scale', function() {
  const scale = new Log({
    min: 1,
    max: 100,
  });

  it('type', function() {
    expect(scale.type).toEqual('log');
  });

  it('config', () => {
    expect(scale.min).toEqual(1);
    expect(scale.max).toEqual(100);
    expect(scale.base).toEqual(10);
  });

  it('scale func', () => {
    expect(scale.scale(10)).toEqual(0.5);
    expect(scale.scale(50)).toEqual(Math.log(50) / Math.log(100));
    expect(scale.scale(1)).toEqual(0);
    expect(scale.scale(100)).toEqual(1);
  });

  it('invert func', () => {
    expect(scale.invert(0)).toEqual(1);
    expect(scale.invert(0.5)).toEqual(10);
    expect(scale.invert(Math.log(50) / Math.log(100))).toBeCloseTo(50, 0.001); // 50.00000000000001
    expect(scale.invert(1)).toEqual(100);
  });

  it('min = max', () => {
    scale.change({min: 100});
    expect(scale.scale(100)).toBe(0);
    expect(scale.invert(0)).toBe(100);
    expect(scale.invert(1)).toBe(100);
  });
});

describe('log scale with log(0)', function() {
  it('scale for c(-10, 100)', () => {
    expect(() => {
      const scale = new Log({
        min: -10,
        max: 100,
      });
    }).toThrow();
  });
});

describe('log scale with specified range', function() {
  const scale = new Log({
    min: 1,
    max: 100,
    range: [ 0, 10 ],
  });

  it('config', () => {
    expect(scale.range).toEqual([ 0, 10 ]);
  });

  it('scale func', () => {
    expect(scale.scale(10)).toEqual(5);
    expect(scale.scale(50)).toBeCloseTo(8.49485, 0.00001);
    expect(scale.scale(1)).toEqual(0);
    expect(scale.scale(100)).toEqual(10);
  });

  it('invert func', () => {
    expect(scale.invert(0)).toEqual(1);
    expect(scale.invert(5)).toEqual(10);
    expect(Math.round(scale.invert(8.49485))).toEqual(50);
    expect(scale.invert(10)).toEqual(100);
  });
});

describe('log scale min = 0', function() {
  it('no values', () => {
    const scale = new Log({
      min: 0,
      max: 100,
    });
    expect(scale.scale(100)).toEqual(1);
    expect(scale.scale(10)).toEqual(2 / 3);
    expect(scale.scale(1)).toBeCloseTo(1 / 3);
    expect(scale.scale(0)).toBeCloseTo(0);

    expect(scale.invert(0)).toBeCloseTo(0);
    expect(scale.invert(1/3)).toBeCloseTo(1);
    expect(scale.invert(2/3)).toBeCloseTo(10);
    expect(scale.invert(1)).toBeCloseTo(100);
  });

  it('has values', () => {
    const scale = new Log({
      min: 0,
      values: [-10, 0, 0.1, 10, 20, 50, 100]
    });
    expect(scale.max).toBe(100);
    expect(scale.ticks).toEqual([0, 0.1, 1, 10, 100]);
    expect(scale.scale(0)).toBe(0);
    expect(scale.scale(1)).toBeCloseTo(0.5);
    expect(scale.invert(0.5)).toBeCloseTo(1);
    expect(scale.invert(1)).toBeCloseTo(100);
  });
});
