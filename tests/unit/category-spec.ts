import { isNumberEqual } from '@antv/util';
import Category from '../../src/category/base';
import '../../src/tick-method/index';
describe('category scale', function () {
  const scale = new Category({
    values: ['一月', '二月', 3, '四月', 5],
  });

  it('config', function () {
    expect(scale.type).toEqual('cat');
    expect(scale.isCategory).toBeTruthy();
    expect(scale.values).toEqual(['一月', '二月', 3, '四月', 5]);
    expect(scale.type).toEqual('cat');
    expect(scale.min).toEqual(0);
    expect(scale.max).toEqual(4);
  });

  it('translate func', function () {
    expect(scale.translate('二月')).toEqual(1);
    expect(scale.translate(1)).toEqual(1);
    expect(scale.translate(3)).toEqual(2);
    expect(scale.translate('六月')).toBeNaN();
  });

  it('scale func', function () {
    expect(scale.scale('二月')).toEqual(0.25);
    expect(scale.scale(1)).toEqual(0.25);
    expect(scale.scale(3)).toEqual(0.5);
    expect(scale.scale(2.5)).toEqual(0.625);
    expect(scale.scale('六月')).toBeNaN();
  });

  it('getText func', function () {
    expect(scale.getText('二月')).toEqual('二月');
    scale.formatter = (text) => `${text}_1`;
    expect(scale.getText('二月')).toEqual('二月_1');
    expect(scale.getText(1)).toEqual('二月_1');
  });

  it('invert func', function () {
    expect(scale.invert(0)).toEqual('一月');
    expect(scale.invert(0.5)).toEqual(3);
    expect(scale.invert(1)).toEqual(5);
    expect(scale.invert(0.51)).toEqual(3);
    expect(scale.invert(-1)).toEqual(NaN);
  });

  it('getTicks func', function () {
    const ticks = scale.getTicks();
    expect(ticks.length).toEqual(scale.values.length);

    expect(ticks[0].value).toEqual(0);
    expect(ticks[ticks.length - 1].value).toEqual(1);
  });

  it('clone func', function () {
    const n1 = scale.clone();
    expect(n1.scale('一月')).toEqual(0);
    expect(n1.scale(3)).toEqual(0.5);
    expect(n1.scale(5)).toEqual(1);

    expect(scale.invert(0)).toEqual('一月');
    expect(scale.invert(0.5)).toEqual(3);
    expect(scale.invert(1)).toEqual(5);

    expect(n1.type).toEqual('cat');
  });

  it('change func', function () {
    scale.change({
      values: ['一', '二', '三', '四', '五', '六'],
    });
    expect(scale.invert(0)).toEqual('一');
    expect(scale.invert(0.4)).toEqual('三');
    expect(scale.invert(1)).toEqual('六');
    expect(scale.getTicks().length).toEqual(6);
  });
});

describe('category scale with specified range', function () {
  const scale = new Category({
    values: ['一月', '二月', '三月', '四月', '五月'],
    range: [0.1, 0.9],
  });

  it('config', function () {
    expect(scale.range).not.toEqual(null);
    expect(scale.range[0]).toEqual(0.1);
    expect(scale.range[1]).toEqual(0.9);
  });

  it('scale func', function () {
    const val = scale.scale('二月');
    // 精度问题，计算结果是0.30000000000000004
    expect(parseFloat(val.toFixed(1))).toEqual(0.3);
    expect(scale.scale('一月')).toEqual(0.1);
    expect(scale.scale('五月')).toEqual(0.9);
  });

  it('invert func', function () {
    expect(scale.invert(0.1)).toEqual('一月');
    expect(scale.invert(0.5)).toEqual('三月');
    expect(scale.invert(0.6)).toEqual('四月');
    expect(scale.invert(0.9)).toEqual('五月');
  });
});

describe('category scale multiple times', () => {
  const scale = new Category({
    values: ['A', 'B', 'C'],
  });

  it('1st time', () => {
    expect(scale.scale('A')).toBe(0);
  });

  it('2nd time', () => {
    scale.range = [0.15, 0.85];
    expect(scale.scale('A')).toBe(0.15);
  });
});

describe('category scale with tickInterval', () => {
  it('normal', () => {
    const scale = new Category({
      values: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
      tickInterval: 1,
    });
    expect(scale.ticks).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G']);
    scale.change({
      tickInterval: 2,
    });
    expect(scale.ticks).toEqual(['A', 'C', 'E', 'G']);
  });

  it.skip('number category', () => {
    const scale = new Category({
      values: [0, 9, 5, 4, 3],
      tickInterval: 1,
    });
    expect(scale.ticks).toEqual([0, 4, 9]);
  });
});
describe('category scale with tickCount', () => {
  it('tickCount = 4', () => {
    const scale = new Category({
      values: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
      tickCount: 4,
    });
    expect(scale.ticks).toEqual(['A', 'C', 'E', 'G']);
  });
});

describe('category min, max', () => {
  it('0 value', () => {
    const scale = new Category({ values: [] });
    expect(scale.min).toEqual(0);
    expect(scale.max).toEqual(0);
  });

  it('1 value', () => {
    const scale = new Category({ values: ['A'] });
    expect(scale.min).toEqual(0);
    expect(scale.max).toEqual(1);
    expect(scale.scale('A')).toEqual(0);
  });

  it('set min', () => {
    const scale = new Category({
      values: ['A', 'B', 'C'],
      min: 1,
    });
    expect(scale.min).toBe(1);
    expect(scale.max).toBe(2);
    expect(scale.scale('A')).toBe(-1);
    expect(scale.scale('B')).toBe(0);
    expect(scale.scale('C')).toBe(1);
    expect(isNumberEqual(scale.scale(1.2), 0.2)).toBe(true);

    expect(scale.invert(0)).toBe('B');
    expect(scale.invert(1)).toBe('C');

    expect(scale.invert(2)).toBe(NaN);
    expect(scale.getTicks().length).toBe(2);
  });

  it('set min ,max', () => {
    const scale = new Category({
      values: ['A', 'B', 'C', 'D', 'E', 'F'],
      min: 1,
      max: 3,
    });
    expect(scale.min).toBe(1);
    expect(scale.max).toBe(3);
    expect(scale.scale('A')).toBe(-0.5);
    expect(scale.scale('C')).toBe(0.5);
    expect(scale.scale('E')).toBe(1.5);
    expect(scale.invert(-0.2)).toBe('B');
    expect(scale.invert(0)).toBe('B');
    expect(scale.invert(1)).toBe('D');
    expect(scale.invert(-1)).toBe(NaN);
    expect(scale.getTicks().length).toBe(3);
    scale.change({
      min: 0,
      max: 4,
    });
    expect(scale.min).toBe(0);
    expect(scale.max).toBe(4);
    expect(scale.getTicks().length).toBe(5);
  });
});

describe('category translate cache', () => {
  const scale = new Category({
    values: ['A', 'B', 'C', 'D', 'E', 'F'],
    min: 1,
    max: 3,
  });

  // @ts-ignore
  expect(scale.cache.has('A')).toBeFalsy();
  // @ts-ignore
  expect(scale.cache.has('B')).toBeFalsy();
  // @ts-ignore
  expect(scale.cache.has('C')).toBeFalsy();

  expect(scale.scale('A')).toBe(-0.5);
  // @ts-ignore
  expect(scale.cache.has('A')).toBeTruthy();
  // @ts-ignore
  expect(scale.cache.has('B')).toBeFalsy();
  // @ts-ignore
  expect(scale.cache.has('C')).toBeFalsy();

  expect(scale.scale('C')).toBe(0.5);
  // @ts-ignore
  expect(scale.cache.has('A')).toBeTruthy();
  // @ts-ignore
  expect(scale.cache.has('B')).toBeFalsy();
  // @ts-ignore
  expect(scale.cache.has('C')).toBeTruthy();

  scale.change({ values: ['A', 'B', 'C'] });

  // @ts-ignore
  expect(scale.cache.has('A')).toBeFalsy();
  // @ts-ignore
  expect(scale.cache.has('B')).toBeFalsy();
  // @ts-ignore
  expect(scale.cache.has('C')).toBeFalsy();
});
