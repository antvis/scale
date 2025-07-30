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

  test('test band with huge domain (1000000)', () => {
    const N = 1000000;
    const domain = Array.from({ length: N }, (_, i) => `Item${i}`);
    const flex = Array(N).fill(1);
    const range = [0, N];

    const bandScale = new Band({ domain, flex, range });

    expect(bandScale.map('Item0')).toBeCloseTo(0, 5);
    expect(bandScale.map(`Item${N - 1}`)).toBeCloseTo(N - (range[1] - range[0]) / N, 5);
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
      unknown: null,
    });
    expect(bandScale.map('bar')).toStrictEqual(null);
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

  test('test non-normalized flex options', () => {
    const bandScale = new Band({
      domain: ['A', 'B', 'C'],
      flex: [20, 30, 10],
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

    bandScale.update({
      range: [0, 300],
      paddingOuter: 0.2,
      paddingInner: 0.2,
      round: true,
      align: 0.5,
    });
    expect(bandScale.map('A')).toBe(19);
    expect(bandScale.map('B')).toBeCloseTo(112);
    expect(bandScale.map('C')).toBeCloseTo(243);
  });

  test('test flex is all 1', () => {
    const bandScale = new Band({
      domain: ['A', 'B', 'C'],
      flex: [1, 1, 1],
      range: [0, 300],
    });
    expect(bandScale.getBandWidth()).toBe(100);
    expect(bandScale.getStep()).toBe(100);
  });

  test('test domain length is null', () => {
    const bandScale = new Band({
      domain: [],
      flex: [1, 2, 3],
      range: [0, 500],
    });
    expect(bandScale.getBandWidth()).toBe(1);
    expect(bandScale.getStep()).toBe(1);
    expect(bandScale.getRange()).toStrictEqual([]);
  });

  test('test flex options with object type domain', () => {
    const time = [new Date(Date.UTC(2022, 9, 5)), new Date(Date.UTC(2022, 9, 6)), new Date(Date.UTC(2022, 9, 7))];
    const bandScale = new Band({
      domain: time,
      flex: [2, 3],
      range: [0, 500],
    });
    expect(bandScale.map(new Date(Date.UTC(2022, 9, 5)))).toBe(0);
    expect(bandScale.map(new Date(Date.UTC(2022, 9, 6)))).toBeCloseTo(166.67);
    expect(bandScale.map(new Date(Date.UTC(2022, 9, 7)))).toBeCloseTo(416.67);

    const ba = bandScale.getBandWidth(new Date(Date.UTC(2022, 9, 5)));
    const bb = bandScale.getBandWidth(new Date(Date.UTC(2022, 9, 6)));
    const bc = bandScale.getBandWidth(new Date(Date.UTC(2022, 9, 7)));
    expect([ba, bb, bc].map((d) => d / bc)).toEqual([2, 3, 1]);

    expect(bandScale.getStep(new Date(Date.UTC(2022, 9, 5)))).toBeCloseTo(166.67, 2);
  });
});
