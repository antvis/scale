import { Band } from '../../../src/scales/band';

describe('band scale', () => {
  test('default options', () => {
    const bandScale = new Band();
    const opt = bandScale.getOptions();

    expect(opt.domain).toStrictEqual([]);
    expect(opt.range).toStrictEqual([0, 1]);
    expect(opt.bandWidth).toStrictEqual(1);
    expect(opt.step).toStrictEqual(1);
    expect(opt.round).toStrictEqual(false);
    expect(opt.paddingInner).toStrictEqual(0);
    expect(opt.paddingOuter).toStrictEqual(0);
    expect(opt.align).toStrictEqual(0.5);
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

    expect(bandScale.getOptions().bandWidth).toStrictEqual(25);
    expect(bandScale.getOptions().step).toStrictEqual(25);

    expect(bandScale.categoryBase.getOptions().range).toStrictEqual([0, 25, 50, 75]);
  });

  test('test padding option', () => {
    const bandScale = new Band({
      domain: ['one', 'two', 'three', 'four'],
      range: [0, 100],
    });

    bandScale.update({
      paddingInner: 0.6,
    });
    expect(bandScale.getOptions().step).toBeCloseTo(29.4, -1);
  });

  test('test unknown option', () => {
    const bandScale = new Band({
      domain: ['one', 'two', 'three', 'four'],
      range: [0, 100],
    });
    // 注：category 对于不存在数据的默认处理方式是添加进去，所以这里是 0
    expect(bandScale.map('wow')).toStrictEqual(0);

    bandScale.update({
      unknown: 'hello world~',
    });
    expect(bandScale.map('bar')).toStrictEqual('hello world~');
  });
});
