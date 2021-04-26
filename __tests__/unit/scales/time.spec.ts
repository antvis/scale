import { Time, TimeOptions } from '../../../src';
import { d3Time } from '../../../src/tick-methods/d3-time';
import { createInterpolate, d3TimeNice } from '../../../src/utils';

function UTC(
  year: number,
  month: number,
  date: number = 1,
  hours: number = 0,
  minutes: number = 0,
  seconds: number = 0,
  ms: number = 0
) {
  return new Date(Date.UTC(year, month, date, hours, minutes, seconds, ms));
}

describe('Time', () => {
  test('has expected default options', () => {
    const time = new Time();
    const { interpolate, tickMethod, ...options } = time.getOptions();

    expect(options).toEqual({
      domain: [new Date(2000, 0, 1), new Date(2000, 0, 2)],
      range: [0, 1],
      nice: false,
      tickCount: 10,
      tickInterval: undefined,
      unknown: undefined,
      clamp: false,
      mask: undefined,
      utc: false,
    });

    expect(tickMethod).toBe(d3Time);
    expect(interpolate).toBe(createInterpolate);
  });

  test('map(x) coerces x to timestamp if x is Date Object', () => {
    const options: TimeOptions = {
      range: [0, 960],
    };
    const time = new Time(options);

    expect(time.map(new Date(2000, 0, 1, 5))).toBe(200);
    expect(time.map(new Date(2000, 0, 1, 16))).toBe(640);
  });

  test('map(x) return options.unknown if x can not coerces to number', () => {
    const time = new Time({
      unknown: 'dirty',
    });

    expect(time.map(undefined)).toBe('dirty');

    // @ts-ignore
    expect(time.map(NaN)).toBe('dirty');
  });

  test('invert(x)', () => {
    const time = new Time({
      range: [0, 960],
    });

    expect(time.invert(200)).toEqual(new Date(2000, 0, 1, 5));
    expect(time.invert(640)).toEqual(new Date(2000, 0, 1, 16));
  });

  test('clone()', () => {
    const time = new Time();
    const time1 = time.clone();

    expect(time.getOptions()).toEqual(time1.getOptions());
    expect(time.getOptions()).not.toBe(time1.getOptions());
    expect(time1).toBeInstanceOf(Time);
  });

  test('chooseNice() return d3TimeNice', () => {
    const time = new Time();

    // @ts-ignore
    expect(time.chooseNice()).toBe(d3TimeNice);
  });

  test('getTicks() calls options.tickMethod and return its return value', () => {
    const scale = new Time({
      tickInterval: 100,
      tickMethod: (min, max, count, interval) => {
        expect(min).toEqual(new Date(2000, 0, 1));
        expect(max).toEqual(new Date(2000, 0, 2));
        expect(count).toBe(10);
        expect(interval).toBe(100);
        return [];
      },
    });
    expect(scale.getTicks()).toStrictEqual([]);
  });

  test('nice domain if options.nice === true', () => {
    const scale = new Time({
      nice: true,
      domain: [],
    });
    expect(scale.getOptions().domain).toEqual([]);
  });

  test('options.mask specify the mask for getFormatter()', () => {
    const time = new Time({
      mask: '[Hello] YYYY',
    });

    const f = time.getFormatter();
    expect(f(new Date(2021, 0, 1))).toBe('Hello 2021');
  });

  test('getFormatter() formats local milliseconds', () => {
    const f = new Time().getFormatter();
    const date = new Date(2021, 11, 31, 23, 59, 59, 999);
    expect(f(date)).toBe('.999');
  });

  test('getFormatter() formats local seconds', () => {
    const f = new Time().getFormatter();
    const date = new Date(2021, 11, 31, 23, 59, 59);
    expect(f(date)).toBe(':59');
  });

  test('getFormatter() formats local minutes', () => {
    const f = new Time().getFormatter();
    const date = new Date(2021, 11, 31, 23, 59);
    expect(f(date)).toBe('11:59');
  });

  test('getFormatter() formats local hours', () => {
    const f = new Time().getFormatter();
    const date = new Date(2021, 11, 31, 23);
    expect(f(date)).toBe('11 PM');
  });

  test('getFormatter() formats local days', () => {
    const f = new Time().getFormatter();
    const date = new Date(2021, 3, 26);
    expect(f(date)).toBe('Apr 26');
  });

  test('getFormatter() formats local weeks', () => {
    const f = new Time().getFormatter();
    const date = new Date(2021, 3, 25);
    expect(f(date)).toBe('Sun 25');
  });

  test('getFormatter() formats local month', () => {
    const f = new Time().getFormatter();
    const date = new Date(2021, 3);
    expect(f(date)).toBe('April');
  });

  test('getFormatter() formats local year', () => {
    const f = new Time().getFormatter();
    const date = new Date(2021, 0);
    expect(f(date)).toBe('2021');
  });

  test('getFormatter() formats utc milliseconds', () => {
    const f = new Time({ utc: true }).getFormatter();
    const date = UTC(2021, 11, 31, 23, 59, 59, 999);
    expect(f(date)).toBe('.999');
  });

  test('getFormatter() formats utc seconds', () => {
    const f = new Time({ utc: true }).getFormatter();
    const date = UTC(2021, 11, 31, 23, 59, 59);
    expect(f(date)).toBe(':59');
  });

  test('getFormatter() formats utc minutes', () => {
    const f = new Time({ utc: true }).getFormatter();
    const date = UTC(2021, 11, 31, 23, 59);
    expect(f(date)).toBe('11:59');
  });

  test('getFormatter() formats utc hours', () => {
    const f = new Time({ utc: true }).getFormatter();
    const date = UTC(2021, 11, 31, 23);
    expect(f(date)).toBe('11 PM');
  });

  test('getFormatter() formats utc days', () => {
    const f = new Time({ utc: true }).getFormatter();
    const date = UTC(2021, 3, 26);
    expect(f(date)).toBe('Apr 26');
  });

  test('getFormatter() formats utc weeks', () => {
    const f = new Time({ utc: true }).getFormatter();
    const date = UTC(2021, 3, 25);
    expect(f(date)).toBe('Sun 25');
  });

  test('getFormatter() formats utc month', () => {
    const f = new Time({ utc: true }).getFormatter();
    const date = UTC(2021, 3);
    expect(f(date)).toBe('April');
  });

  test('getFormatter() formats utc year', () => {
    const f = new Time({ utc: true }).getFormatter();
    const date = UTC(2021, 0);
    expect(f(date)).toBe('2021');
  });
});
