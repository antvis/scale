import { Category } from '../../../src/scales/category';

describe('category scale', () => {
  test('category has no expected defaults', () => {
    const c = new Category();
    expect(c.getOptions().domain).toStrictEqual([]);
    expect(c.getOptions().range).toStrictEqual([]);
    expect(c.getOptions().unknown).toBeUndefined();
  });

  test('default options', () => {
    const scale = new Category();
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
    const scale = new Category({
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
    expect(scale.getOptions().domain.length).toStrictEqual(6);

    // NaN / undefined / null 做法同上
    expect(scale.map(NaN)).toStrictEqual('January');
    expect(scale.map(undefined)).toStrictEqual('February');
    expect(scale.map(null)).toStrictEqual('January');
  });

  test('invert func', () => {
    // 映射规则类似于 map 方法，这里不再赘述
    const scale = new Category({
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

  test('update scale', () => {
    const scale = new Category({
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
    const scale = new Category({
      domain: ['A', 'B', 'C'],
      range: ['a', 'b', 'c'],
    });
    const newScale = scale.clone();
    expect(scale.getOptions()).toStrictEqual(newScale.getOptions());
  });

  test('rangeIndexMap has been set null when we use invert or map method', () => {
    const scale = new Category({
      domain: ['A', 'B', 'C'],
      range: ['a', 'b', 'c'],
    });

    expect(scale.map('A')).toStrictEqual('a');
    // @ts-ignore
    scale.rangeIndexMap = null;
    // @ts-ignore
    scale.domainIndexMap = null;
    expect(scale.map('A')).toStrictEqual('a');
    expect(scale.invert('a')).toStrictEqual('A');
  });

  test('use unknown data', () => {
    const scale = new Category({
      domain: ['A', 'B', 'C'],
      range: ['a', 'b', 'c'],
    });
    expect(scale.map('D')).toStrictEqual('a');
    scale.update({
      unknown: 'hello world',
    });
    expect(scale.map('E')).toStrictEqual('hello world');
    expect(scale.invert('foo')).toStrictEqual('hello world');
  });
});
