import { Band, BandOptions } from '../../../src';

describe('band scale', () => {
  test('default options and methods', () => {
    const bandScale = new Band();
    const opt = bandScale.getOptions() as BandOptions;
    expect(opt.domain).toStrictEqual([]);
    expect(bandScale.getBandWidth()).toStrictEqual(1);
    expect(opt.round).toStrictEqual(false);
    expect(opt.paddingInner).toStrictEqual(0);
    expect(opt.paddingOuter).toStrictEqual(0);
    expect(opt.align).toStrictEqual(0.5);
    expect(opt.range).toStrictEqual([0, 1]);
    expect(opt.flex).toStrictEqual([]);

    expect(bandScale.getBandWidth()).toStrictEqual(1);
    expect(bandScale.getStep()).toStrictEqual(1);
  });

  test('test map fn(common usage)', () => {
    const bandScale = new Band({
      domain: ['one', 'two', 'three', 'four'],
      range: [0, 100],
    });

    expect(bandScale.map('one')).toStrictEqual(0);
    expect(bandScale.map('two')).toStrictEqual(25);
    expect(bandScale.map('three')).toStrictEqual(50);
    expect(bandScale.map('four')).toStrictEqual(75);

    const opt = bandScale.getOptions();

    expect(bandScale.getBandWidth()).toStrictEqual(25);
    expect(bandScale.getStep()).toStrictEqual(25);

    expect(opt.range).toStrictEqual([0, 100]);
  });

  test('test invert fn(common usage)', () => {
    const bandScale = new Band({
      domain: ['one', 'two', 'three', 'four'],
      range: [0, 100],
    });

    const opt = bandScale.getOptions() as BandOptions;

    expect(bandScale.invert(0)).toStrictEqual('one');
    expect(bandScale.invert(25)).toStrictEqual('two');
    expect(bandScale.invert(50)).toStrictEqual('three');
    expect(bandScale.invert(75)).toStrictEqual('four');

    expect(opt.domain).toStrictEqual(['one', 'two', 'three', 'four']);
  });

  test('test padding-inner option', () => {
    const bandScale = new Band({
      domain: ['A', 'B', 'C'],
      range: [0, 500],
    });

    bandScale.update({
      paddingInner: 0.1,
    });

    expect(bandScale.getStep()).toBeCloseTo(172.414, 3);
  });

  test('test padding-outer option', () => {
    const bandScale = new Band({
      domain: ['A', 'B', 'C'],
      range: [0, 500],
      paddingOuter: 0.2,
    });

    expect(bandScale.getStep()).toBeCloseTo(147.059, 3);
  });

  test('test padding-inner and padding-outer options', () => {
    const scale = new Band({
      domain: ['A', 'B', 'C'],
      paddingInner: 1,
    });
    expect(scale.map('C')).toBe(1);
    // @ts-ignore
    expect(scale.adjustedRange).toEqual([0, 0.5, 1]);
  });

  test('test round option', () => {
    // 取整测试
    const bandScale = new Band({
      domain: ['A', 'B', 'C'],
      range: [0, 500],
      paddingOuter: 0.2,
    });

    expect(bandScale.map('A')).toBeCloseTo(29.41, 2);
    expect(bandScale.map('B')).toBeCloseTo(176.47, 2);
    expect(bandScale.map('C')).toBeCloseTo(323.53, 2);

    bandScale.update({
      round: true,
    });

    expect(bandScale.map('A')).toStrictEqual(30);
    expect(bandScale.map('B')).toStrictEqual(177);
    expect(bandScale.map('C')).toStrictEqual(324);
  });

  test('test unknown option', () => {
    const bandScale = new Band({
      domain: ['A', 'B', 'C'],
      range: [0, 100],
    });
    // 注：ordinal 对于不存在数据的默认处理方式是添加进去，所以这里是 0
    expect(bandScale.map('wow')).toStrictEqual(0);

    bandScale.update({
      unknown: 'hello world~',
    });
    expect(bandScale.map('bar')).toStrictEqual('hello world~');
  });

  test('test padding option', () => {
    const bandScale = new Band({
      domain: ['A', 'B', 'C'],
      range: [0, 500],
      paddingInner: 0.2,
      paddingOuter: 0.2,
      round: true,
    });

    expect(bandScale.getStep()).toStrictEqual(156);
    bandScale.update({
      padding: 0.1,
    });

    expect(bandScale.getStep()).toStrictEqual(161);
  });

  test('test clone', () => {
    const oldBandScale = new Band({
      domain: ['A', 'B', 'C'],
      range: [0, 500],
    });
    const newBandScale = oldBandScale.clone();
    expect(oldBandScale.getOptions()).toStrictEqual(newBandScale.getOptions());
    expect(oldBandScale.getOptions() !== newBandScale.getOptions()).toBeTruthy();
  });

  test('test update options', () => {
    const bandScale = new Band({
      domain: ['one', 'two', 'three', 'four'],
      range: [0, 100],
    });
    expect(bandScale.getOptions().range).toStrictEqual([0, 100]);

    bandScale.update({
      range: [0, 1000],
    });

    expect(bandScale.getOptions().range).toStrictEqual([0, 1000]);
  });

  test('test flex options', () => {
    const bandScale = new Band({
      domain: ['A', 'B', 'C'],
      flex: [2, 3, 1],
      range: [0, 500],
    });

    const ba = bandScale.getBandWidth('A');
    const bb = bandScale.getBandWidth('B');
    const bc = bandScale.getBandWidth('C');
    expect([ba, bb, bc].map((d) => d / bc)).toEqual([2, 3, 1]);

    expect(bandScale.getStep('A')).toBeCloseTo(166.67);
    expect(bandScale.getStep('B')).toBe(250);
    expect(bandScale.getStep('C')).toBeCloseTo(83.33);

    expect(bandScale.map('A')).toBe(0);
    expect(bandScale.map('B')).toBeCloseTo(166.67);
    expect(bandScale.map('C')).toBeCloseTo(416.67);
  });

  test('test patch flex options', () => {
    const bandScale = new Band({
      domain: ['A', 'B', 'C'],
      flex: [2, 3],
      range: [0, 500],
    });
    expect(bandScale.map('A')).toBe(0);
    expect(bandScale.map('B')).toBeCloseTo(166.67);
    expect(bandScale.map('C')).toBeCloseTo(416.67);

    bandScale.update({
      flex: [2, 3, 1, 1],
    });
    expect(bandScale.map('A')).toBe(0);
    expect(bandScale.map('B')).toBeCloseTo(166.67);
    expect(bandScale.map('C')).toBeCloseTo(416.67);
  });
});
