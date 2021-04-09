import * as d3 from 'd3-scale';
import { Category } from '../../../src/scales/category';
import { benchMarkBetween } from '../../test-utils/benchmark';

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
    const oldOpt = scale.getOptions();
    const newOpt = newScale.getOptions();
    expect(oldOpt).toStrictEqual(newOpt);
    expect(oldOpt !== newOpt).toBeTruthy();
    expect(oldOpt.domain !== newOpt.domain).toBeTruthy();
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

  test('duplicate data in domain or range', () => {
    const scale = new Category({
      domain: ['苹果', '橘子', '苹果', '苹果'],
      range: ['apple', 'orange'],
    });

    expect(scale.map('苹果')).toStrictEqual('apple');
    expect(scale.invert('apple')).toStrictEqual('苹果');
    expect(scale.invert('orange')).toStrictEqual('橘子');
  });

  test('compare pref with d3', async () => {
    // 和 d3 对大数据（十万）情况做性能对比，在调用 update 的数量较大的场景下，antv-scale 的效率较 d3 有质的提升
    const domain = new Array(100000).fill('').map((item, index) => index);
    const range = new Array(100000).fill('').map((item, index) => index);

    const timeForAntv = () => {
      const antvScale = new Category({
        domain,
        range,
      });
      for (let i = 0; i < 100000; i += 1) {
        antvScale.map(i);
        // 中途重置 domain
        if (i % 4000 === 0) {
          antvScale.update({
            domain: range,
            range,
          });
        }
      }
    };

    const timeForD3 = () => {
      const d3Scale = d3.scaleOrdinal().domain(domain).range(range);
      for (let i = 0; i < 100000; i += 1) {
        d3Scale(i);
        if (i % 4000 === 0) {
          // 中途重置 domain
          d3Scale.domain(range).range(range);
        }
      }
    };

    await benchMarkBetween({
      cb1: timeForAntv,
      cb2: timeForD3,
      magnification: 1.5,
      check: true,
    });
  });
});
