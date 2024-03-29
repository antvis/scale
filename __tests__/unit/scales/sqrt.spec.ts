import { d3Ticks, Sqrt } from '../../../src';

describe('sqrt scale test', () => {
  // 父类对于 0.5 的特殊值我们是使用 Math.sqrt API, 这已经在父类测试过了，没必要再添加额外的测试
  test('test default options', () => {
    const sqrt = new Sqrt();

    // 我们继承了 pow 类，只修改了一个选项，剩余选项的测试应该在父类体现
    expect(sqrt.getOptions().exponent).toStrictEqual(0.5);
    expect(sqrt.getOptions().tickMethod).toBe(d3Ticks);
  });

  test('test update', () => {
    const sqrt = new Sqrt();
    sqrt.update({ domain: [0, 10] });
    expect(sqrt.getOptions().domain).toEqual([0, 10]);
  });

  test('clone() returns a Sqrt scale with same and independent options', () => {
    const x1 = new Sqrt();
    const x2 = x1.clone();

    expect(x2).toBeInstanceOf(Sqrt);
    expect(x1.getOptions()).toEqual(x2.getOptions());
    expect(x1.getOptions() !== x2.getOptions()).toBeTruthy();
  });
});
