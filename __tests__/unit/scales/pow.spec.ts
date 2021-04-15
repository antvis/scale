import { Pow } from '../../../src/scales/pow';
import { calculatePowTicks } from '../../../src/tick-method/pow';

describe('pow scales', () => {
  test('test default options', () => {
    const scale = new Pow();
    const { domain, range, round, tickCount, nice, clamp, unknown, tickMethod, exponent } = scale.getOptions();

    expect(exponent).toStrictEqual(2);
    expect(domain).toStrictEqual([0, 1]);
    expect(range).toStrictEqual([0, 1]);
    expect(round).toBeFalsy();
    expect(tickCount).toStrictEqual(5);
    expect(nice).toBeFalsy();
    expect(clamp).toBeFalsy();
    expect(unknown).toBeUndefined();
    expect(tickMethod).toBe(calculatePowTicks);
  });

  test('test when exponent is 0.5, we use Math.sqrt API, not Math.pow', () => {
    const scale = new Pow({
      exponent: 0.5,
      domain: [0, 100],
      range: [0, 100],
    });

    expect(scale.map(25)).toStrictEqual(50);
    expect(scale.map(50)).toBeCloseTo(70.71, -2);
  });

  test('map fn', () => {
    const scale = new Pow({
      domain: [0, 100],
      range: [0, 100],
      exponent: 2,
    });

    expect(scale.map(0)).toStrictEqual(0);
    expect(scale.map(25)).toStrictEqual(6.25);
    expect(scale.map(50)).toBeCloseTo(25);
    expect(scale.map(100)).toStrictEqual(100);
    expect(scale.map(-25)).toStrictEqual(-6.25);
  });

  test('test for poly range or domain', () => {
    const scale = new Pow({
      domain: [0, 100, 120],
      range: [0, 100, 1200],
      exponent: 2,
    });

    expect(scale.map(100)).toStrictEqual(100);
    expect(scale.map(25)).toStrictEqual(6.25);
    expect(scale.map(110)).toStrictEqual(625);

    expect(scale.invert(100)).toStrictEqual(100);
    expect(scale.invert(6.25)).toStrictEqual(25);
    expect(scale.invert(625)).toStrictEqual(110);
    expect(scale.invert(-6.25)).toStrictEqual(-25);
  });

  test('invert fn', () => {
    const scale = new Pow({
      domain: [0, 100],
      range: [0, 100],
      exponent: 2,
    });

    expect(scale.invert(0)).toStrictEqual(0);
    expect(scale.invert(25)).toStrictEqual(50);

    expect(scale.invert(100)).toStrictEqual(100);
    expect(scale.invert(6.25)).toStrictEqual(25);
  });

  test('test getTicks', () => {
    const scale = new Pow({
      domain: [0, 120],
      exponent: 2,
    });

    // getTicks Method
    expect(scale.getTicks()).toStrictEqual([0, 4, 16, 36, 64, 100, 144]);

    // update tickCount
    scale.update({
      tickCount: 10,
    });
    expect(scale.getTicks()).toStrictEqual([0, 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121]);
  });

  test('test negative data', () => {
    const scale = new Pow({
      domain: [-120, 120],
      exponent: 2,
      range: [-100, 100],
    });

    expect(scale.map(0)).toStrictEqual(0);
    expect(scale.map(60)).toBeCloseTo(70.71, -2);
    expect(scale.map(-60)).toBeCloseTo(-70.71, -2);
    expect(scale.getTicks()).toStrictEqual([-225, -100, -25, 0, 25, 100, 225]);
  });

  test('test nice option', () => {
    const scale = new Pow({
      domain: [0.6, 10.4],
      exponent: 10,
      nice: true,
    });

    // 调用 map 之后才会触发 nice
    expect(scale.map(0)).toStrictEqual(0);

    expect(scale.getOptions().domain).toStrictEqual([0, 11]);
  });

  test('test clone method', () => {
    const scale = new Pow({
      domain: [0.6, 10.4],
      exponent: 10,
      nice: true,
    });
    const newScale = scale.clone();
    expect(scale.getOptions()).toStrictEqual(newScale.getOptions());
    expect(scale.getOptions().domain !== newScale.getOptions().domain).toBeTruthy();
  });
});
