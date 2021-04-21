import { Pow } from '../../../src';
import { d3Linear } from '../../../src/tick-methods/d3-linear';

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
    expect(tickMethod).toBe(d3Linear);
  });

  test('test when exponent is 0.5, we use Math.sqrt API, not Math.pow', () => {
    const scale = new Pow({
      exponent: 0.5,
      domain: [0, 100],
      range: [0, 100],
    });

    expect(scale.map(25)).toStrictEqual(50);
    expect(scale.map(-25)).toStrictEqual(-50);
    expect(scale.map(50)).toBeCloseTo(70.71, 2);
  });

  test('test when exponent is 1, we use identity', () => {
    const scale = new Pow({
      exponent: 1,
      domain: [0, 100],
      range: [0, 100],
    });

    expect(scale.map(25)).toStrictEqual(25);
    expect(scale.map(-25)).toStrictEqual(-25);
    expect(scale.invert(-25)).toStrictEqual(-25);
    expect(scale.map(50)).toStrictEqual(50);
  });

  test('map fn', () => {
    const scale = new Pow({
      domain: [0, 100],
      range: [0, 100],
      exponent: 2,
    });

    expect(scale.map(0)).toStrictEqual(0);
    expect(scale.map(25)).toStrictEqual(6.25);
    expect(scale.map(50)).toStrictEqual(25);
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
      domain: [0.01, 100000],
      exponent: 2,
      tickCount: 10,
    });
    expect(scale.getTicks()).toStrictEqual([10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000]);
  });

  test('test negative data', () => {
    const scale = new Pow({
      domain: [-120, 120],
      exponent: 2,
      range: [-100, 100],
    });

    expect(scale.map(0)).toStrictEqual(0);
    expect(scale.map(60)).toStrictEqual(25);
    expect(scale.map(-60)).toStrictEqual(-25);
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
