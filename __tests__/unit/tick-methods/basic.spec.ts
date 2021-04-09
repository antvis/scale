import { ticks } from '../../../src/tick-method/basic';

describe('Basic tick method', () => {
  // 该方法还没有实现，现在简单测试一下提高覆盖率，不然 CI 会出问题
  test('ticks() returns []', () => {
    expect(ticks()).toEqual([]);
  });
});
