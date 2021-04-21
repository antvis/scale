import { Constant, ConstantOptions } from '../../../src';

describe('Constant', () => {
  test('Constant() has expected defaults', () => {
    const s = new Constant();
    expect(s.getOptions()).toEqual({
      range: [0],
      domain: [0, 1],
    });
  });

  test('Constant(options) override defaults', () => {
    const options: ConstantOptions = {
      domain: [1],
    };

    const s = new Constant(options);

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

  test('invert(x) returns options.domain if x is the constant', () => {
    const x = new Constant();

    expect(x.invert(0)).toEqual([0, 1]);
  });

  test('invert(x) returns [] if x is not the constant', () => {
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

  test('clone() returns a scale belong to same class', () => {
    const s = new Constant();
    const s1 = s.clone();
    expect(s1).toBeInstanceOf(Constant);
  });

  test('clone() returns a scale with the same options as the original one', () => {
    const s = new Constant();
    const s1 = s.clone();
    expect(s.getOptions()).toEqual(s1.getOptions());
  });

  test('clone() returns a scale isolating change with the original one', () => {
    const s = new Constant();
    const s1 = s.clone();

    s.update({
      range: [10],
    });
    expect(s1.getOptions().range).toEqual([0]);

    s1.update({
      range: [20],
    });
    expect(s.getOptions().range).toEqual([10]);
  });
});
