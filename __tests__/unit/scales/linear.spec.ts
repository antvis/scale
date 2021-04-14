import { Linear } from '../../../src/scales/linear';
import { wilkinsonExtended } from '../../../src/tick-method/wilkinson-extended';

describe('Linear Scale Test', () => {
  test('test default options', () => {
    const scale = new Linear();
    const { domain, range, round, tickCount, nice, clamp, unknown, tickMethod } = scale.getOptions();

    expect(domain).toStrictEqual([0, 1]);
    expect(range).toStrictEqual([0, 1]);
    expect(round).toBeFalsy();
    expect(tickCount).toStrictEqual(5);
    expect(nice).toBeFalsy();
    expect(clamp).toBeFalsy();
    expect(unknown).toBeUndefined();
    expect(tickMethod).toBe(wilkinsonExtended);
  });

  test('test map fn', () => {
    const scale = new Linear({
      domain: [0, 100],
      range: [500, 1000],
    });

    expect(scale.map(0)).toStrictEqual(500);
    expect(scale.map(100)).toStrictEqual(1000);
    expect(scale.map(50)).toStrictEqual(750);
    expect(scale.map(250)).toStrictEqual(1750);

    // poly range
    scale.update({
      range: [0, 100, 500],
    });

    expect(scale.map(0)).toStrictEqual(0);
    expect(scale.map(50)).toStrictEqual(50);

    scale.update({
      domain: [0, 5, 10],
      range: [0, 50, 1000],
    });

    expect(scale.map(5)).toStrictEqual(50);
    expect(scale.map(2.5)).toStrictEqual(25);
    expect(scale.map(7.5)).toStrictEqual(525);
    expect(scale.map(10)).toStrictEqual(1000);
    expect(scale.map(100)).toStrictEqual(18100);
    expect(scale.map(-10)).toStrictEqual(-100);
  });

  test('test invert fn', () => {
    const scale = new Linear({
      domain: [0, 100],
      range: [500, 1000],
    });

    expect(scale.invert(500)).toStrictEqual(0);
    expect(scale.invert(750)).toStrictEqual(50);
    expect(scale.invert(1000)).toStrictEqual(100);
    expect(scale.invert(1750)).toStrictEqual(250);

    // poly range
    scale.update({
      range: [0, 100, 500],
    });

    expect(scale.invert(0)).toStrictEqual(0);
    expect(scale.invert(50)).toStrictEqual(50);

    scale.update({
      domain: [0, 5, 10],
      range: [0, 50, 1000],
    });

    expect(scale.invert(50)).toStrictEqual(5);
    expect(scale.invert(25)).toStrictEqual(2.5);
    expect(scale.invert(525)).toStrictEqual(7.5);
    expect(scale.invert(1000)).toStrictEqual(10);
    expect(scale.invert(18100)).toStrictEqual(100);
    expect(scale.invert(-100)).toStrictEqual(-10);
  });

  test('test getTicks()', () => {
    const scale = new Linear({
      domain: [0, 100],
      range: [500, 1000],
    });

    expect(scale.getTicks()).toStrictEqual([0, 25, 50, 75, 100]);
  });

  test('test interval option', () => {
    const scale = new Linear({
      domain: [0, 100],
      range: [500, 1000],
      tickCount: 10,
    });

    expect(scale.getTicks()).toStrictEqual([0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);
  });

  test('test nice option', () => {
    const scale = new Linear({
      domain: [1.1, 10.9],
      range: [500, 1000],
      nice: true,
    });

    // 调用 map 之后才会触发 nice
    expect(scale.map(1)).toStrictEqual(500);

    expect(scale.getOptions().domain).toStrictEqual([1, 11]);
  });

  test('test clone', () => {
    const scale = new Linear({
      domain: [1.1, 10.9],
      range: [500, 1000],
      nice: true,
    });

    const newScale = scale.clone();
    expect(scale.getOptions()).toStrictEqual(newScale.getOptions());
    expect(scale.getOptions() === newScale.getOptions()).toBeFalsy();
  });
});
