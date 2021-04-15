import { Sqrt } from '../../../src/scales/sqrt';

describe('sqrt scale test', () => {
  test('test default options', () => {
    const sqrt = new Sqrt();
    const { exponent } = sqrt.getOptions();
    // 我们继承了 pow 类，只修改了一个选项，剩余选项的测试应该在父类体现
    expect(exponent).toStrictEqual(0.5);
  });
});
