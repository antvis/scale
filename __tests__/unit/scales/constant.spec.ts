import { Constant, ConstantOptions } from '../../../src/index';
import { ticks } from '../../../src/tick-method/basic';

describe('Constant', () => {
  test('Constant() has expected defaults', () => {
    const s = new Constant();
    const { tickMethod, formatter, ...restProps } = s.getOptions();

    expect(restProps).toEqual({
      range: [0],
      domain: [0, 1],
      tickCount: 5,
      tickInterval: 10,
    });
    expect(formatter(1)).toBe('1');
    expect(tickMethod).toEqual(ticks);
  });

  test('Constant(options) override defaults', () => {
    const options: ConstantOptions = {
      tickCount: 20,
      domain: [1],
    };

    const s = new Constant(options);

    // @ts-ignore
    expect(s.options.tickCount).toBe(20);
    // @ts-ignore
    expect(s.options.domain).toEqual([1]);
  });

  test('map(x) is the constant function', () => {
    const x = new Constant();

    expect(x.map(1)).toBe(0);
    expect(x.map('a')).toBe(0);
    expect(x.map(null)).toBe(0);
    expect(x.map(undefined)).toBe(0);
    expect(x.map(NaN)).toBe(0);
  });

  test('map(x) to options.unknown if options.range is empty', () => {
    const x = new Constant({
      range: [],
      unknown: 'unknown',
    });

    expect(x.map(1)).toBe('unknown');
    expect(x.map(null)).toBe('unknown');
    expect(x.map(undefined)).toBe('unknown');
  });

  test('invert(x) return options.domain if x is the constant', () => {
    const x = new Constant();

    expect(x.invert(0)).toEqual([0, 1]);
  });

  test('invert(x) return [] if x is not the constant', () => {
    const x = new Constant();

    expect(x.invert(-0.5)).toEqual([]);
    expect(x.invert(undefined)).toEqual([]);
    expect(x.invert(null)).toEqual([]);
    expect(x.invert(NaN)).toEqual([]);

    x.update({
      range: [],
    });
    expect(x.invert(undefined)).toEqual([]);
  });

  test('clone() return a scale belong to same class', () => {
    const s = new Constant();
    const s1 = s.clone();
    expect(s1).toBeInstanceOf(Constant);
  });

  test('clone() return a scale with the same options as the original one', () => {
    const s = new Constant();
    const s1 = s.clone();
    expect(s.getOptions()).toEqual(s1.getOptions());
  });

  test('clone() return a scale isolating change with the original one', () => {
    const s = new Constant();
    const s1 = s.clone();

    s.update({
      tickCount: 20,
    });
    expect(s1.getOptions().tickCount).toBe(5);

    s1.update({
      tickCount: 30,
    });
    expect(s.getOptions().tickCount).toBe(20);
  });
});
