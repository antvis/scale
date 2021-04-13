import { Linear } from '../../../src/scales/linear';
import { linerTick } from '../../../src/tick-method/linear';

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
    expect(tickMethod).toBe(linerTick);
  });

  test('test map fn', () => {
    const scale = new Linear({
      domain: [0, 100],
      range: [500, 1000],
    });

    expect(scale.map(0)).toStrictEqual(500);
    expect(scale.map(50)).toStrictEqual(750);
    expect(scale.map(100)).toStrictEqual(1000);
    expect(scale.map(250)).toStrictEqual(1750);
  });

  test('test invert fn', () => {
    const scale = new Linear({
      domain: [0, 100],
      range: [500, 1000],
    });
    // 500 / 100 = 5
    expect(scale.invert(500)).toStrictEqual(0);
    expect(scale.invert(750)).toStrictEqual(50);
    expect(scale.invert(1000)).toStrictEqual(100);
    expect(scale.invert(1750)).toStrictEqual(250);
  });

  test('test unknown data', () => {
    const scale = new Linear({
      domain: [0, 100],
      range: [500, 1000],
    });

    expect(scale.map(Number.NaN)).toStrictEqual(undefined);

    scale.update({
      unknown: 'hello world',
    });
    expect(scale.map(Number.NaN)).toStrictEqual('hello world');
  });

  test('test round options', () => {
    const scale = new Linear({
      domain: [0, 100],
      range: [500, 1000],
    });

    expect(scale.map(20.5)).toStrictEqual(602.5);

    scale.update({
      round: true,
    });

    expect(scale.map(20.5)).toStrictEqual(603);
  });

  test('test clamp options', () => {
    const scale = new Linear({
      domain: [0, 100],
      range: [500, 1000],
      clamp: true,
    });
    expect(scale.map(-100)).toStrictEqual(500);
    expect(scale.map(1000)).toStrictEqual(1000);
    expect(scale.invert(-100)).toStrictEqual(0);
    expect(scale.invert(2000)).toStrictEqual(100);
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
