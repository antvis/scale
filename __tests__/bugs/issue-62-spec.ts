import { Linear } from '../../src';

describe('#62', () => {
  it('scale ooo', () => {
    const scale = new Linear({
      min: 0,
      max: {},
    });

    // 不会出现 oom
    expect(scale.getTicks()).toEqual([]);
  });
});
