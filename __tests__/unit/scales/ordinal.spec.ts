import { Ordinal, Comparator } from '../../../src';
import { defaultUnknown } from '../../../src/scales/ordinal';

describe('ordinal scale', () => {
  test('ordinal has expected defaults', () => {
    const c = new Ordinal();
    expect(c.getOptions().domain).toStrictEqual([]);
    expect(c.getOptions().range).toStrictEqual([]);
    expect(c.getOptions().unknown).toBe(defaultUnknown);
  });

  test('default options', () => {
    const scale = new Ordinal();
    expect(scale.map('A')).toStrictEqual(undefined);
    expect(scale.getOptions().domain).toStrictEqual(['A']);
    expect(scale.getOptions().range).toStrictEqual([]);

    // reset
    scale.update({
      range: [],
      domain: [],
    });

    expect(scale.invert('B')).toStrictEqual(undefined);
    expect(scale.getOptions().range).toStrictEqual(['B']);
    expect(scale.getOptions().domain).toStrictEqual([]);
  });

  test('map func', () => {
    const scale = new Ordinal({
      domain: ['一月', '二月', 3, 'Hello', 5],
      range: ['January', 'February'],
    });

    // 正常映射
    expect(scale.map('一月')).toStrictEqual('January');
    expect(scale.map('二月')).toStrictEqual('February');

    // domain 超过 range 界限, 取模映射
    expect(scale.map(3)).toStrictEqual('January');
    expect(scale.map('Hello')).toStrictEqual('February');
    expect(scale.map(5)).toStrictEqual('January');

    // 不存在的值 我们将新值插入 domain 中，并更新 map
    expect(scale.map('3')).toStrictEqual('February');
    expect(scale.getOptions().domain?.length).toStrictEqual(6);

    // NaN / undefined / null 做法同上
    expect(scale.map(NaN)).toStrictEqual('January');
    expect(scale.map(undefined)).toStrictEqual('February');
    expect(scale.map(null)).toStrictEqual('January');
  });

  test('invert func', () => {
    // 映射规则类似于 map 方法，这里不再赘述
    const scale = new Ordinal({
      domain: ['一月', '二月', 3, 'Hello', 5],
      range: ['January', 'February'],
    });

    expect(scale.invert('January')).toStrictEqual('一月');
    expect(scale.invert('February')).toStrictEqual('二月');

    expect(scale.invert('March')).toStrictEqual(3);
    expect(scale.invert('April')).toStrictEqual('Hello');
    expect(scale.invert('May')).toStrictEqual(5);
    expect(scale.invert('June')).toStrictEqual('一月');
  });

  test('map date', () => {
    // 映射规则类似于 map 方法，这里不再赘述
    const date = new Ordinal({
      domain: [new Date('2020-02-01'), new Date('2020-02-02'), new Date('2020-02-03')],
      range: ['a', 'b', 'c'],
    });

    expect(date.map(new Date('2020-02-02'))).toStrictEqual('b');
    expect(date.map(new Date('2020-02-03'))).toStrictEqual('c');
    expect(date.map(new Date('2020-02-01'))).toStrictEqual('a');
  });

  test('invert date', () => {
    // 映射规则类似于 map 方法，这里不再赘述
    const date = new Ordinal({
      domain: ['a', 'b', 'c'],
      range: [new Date('2020-02-01'), new Date('2020-02-02'), new Date('2020-02-03')],
    });

    expect(date.invert(new Date('2020-02-02'))).toStrictEqual('b');
    expect(date.invert(new Date('2020-02-03'))).toStrictEqual('c');
    expect(date.invert(new Date('2020-02-01'))).toStrictEqual('a');
  });

  test('map object', () => {
    const scale = new Ordinal({
      domain: [{ a: 1 }, { a: 2 }, { a: 3 }],
      range: [new Date('2020-02-01'), new Date('2020-02-02'), new Date('2020-02-03')],
    });

    expect(scale.map({ a: 1 })).toStrictEqual(new Date('2020-02-01'));
    expect(scale.map({ a: 2 })).toStrictEqual(new Date('2020-02-02'));
    expect(scale.map({ a: 3 })).toStrictEqual(new Date('2020-02-03'));
  });

  test('invert object', () => {
    const scale = new Ordinal({
      range: [{ a: 1 }, { a: 2 }, { a: 3 }],
      domain: [new Date('2020-02-01'), new Date('2020-02-02'), new Date('2020-02-03')],
    });

    expect(scale.invert({ a: 1 })).toStrictEqual(new Date('2020-02-01'));
    expect(scale.invert({ a: 2 })).toStrictEqual(new Date('2020-02-02'));
    expect(scale.invert({ a: 3 })).toStrictEqual(new Date('2020-02-03'));
  });

  test('update scale', () => {
    const scale = new Ordinal({
      domain: ['A', 'B', 'C'],
      range: ['a', 'b', 'c'],
    });

    expect(scale.map('A')).toStrictEqual('a');

    scale.update({
      domain: ['AA', 'BB', 'CC', 'DD'],
    });

    expect(scale.map('A')).toStrictEqual('b');
  });

  test('clone scale', () => {
    const scale = new Ordinal({
      domain: ['A', 'B', 'C'],
      range: ['a', 'b', 'c'],
    });
    const newScale = scale.clone();
    const oldOpt = scale.getOptions();
    const newOpt = newScale.getOptions();
    expect(oldOpt).toStrictEqual(newOpt);
    expect(oldOpt !== newOpt).toBeTruthy();
    expect(oldOpt.domain !== newOpt.domain).toBeTruthy();
  });

  test('use unknown data', () => {
    const scale = new Ordinal({
      domain: ['A', 'B', 'C'],
      range: ['a', 'b', 'c'],
    });
    expect(scale.map('D')).toStrictEqual('a');
    scale.update({
      unknown: null,
    });
    expect(scale.map('E')).toStrictEqual(null);
    expect(scale.invert('foo')).toStrictEqual(null);
  });

  test('duplicate data in domain or range', () => {
    const scale = new Ordinal({
      domain: ['苹果', '橘子', '苹果', '苹果'],
      range: ['apple', 'orange'],
    });

    expect(scale.map('苹果')).toStrictEqual('apple');
    expect(scale.invert('apple')).toStrictEqual('苹果');
    expect(scale.invert('orange')).toStrictEqual('橘子');
  });

  test('options.compare should sort the domain before mapping', () => {
    const scale = new Ordinal({
      domain: ['2021-04-19', '2021-04-20', '2021-04-18'],
      range: ['A', 'B', 'C'],
    });

    expect(scale.map('2021-04-19')).toBe('A');
    expect(scale.map('2021-04-20')).toBe('B');
    expect(scale.map('2021-04-18')).toBe('C');
    expect(scale.getDomain()).toEqual(['2021-04-19', '2021-04-20', '2021-04-18']);

    const compare: Comparator = (a, b) => +new Date(a) - +new Date(b);
    scale.update({
      compare,
    });

    expect(scale.map('2021-04-18')).toBe('A');
    expect(scale.map('2021-04-19')).toBe('B');
    expect(scale.map('2021-04-20')).toBe('C');
    expect(scale.getDomain()).toEqual(['2021-04-18', '2021-04-19', '2021-04-20']);
  });
});
