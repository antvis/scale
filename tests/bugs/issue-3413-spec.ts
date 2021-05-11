import { Linear } from '../../src';

describe('issue-3413', function () {
  it('issue-3413', () => {
    const scale = new Linear({
      values: [18203, 23489, 29034, 104970, 131744],
      max: NaN,
      nice: true,
    });

    // 不会出现 oom
    expect(scale.getTicks()).toStrictEqual([]);
  });
});
