import { Linear } from '../../src';

describe('issue-53', () => {
  test('#53', () => {
    const instance = new Linear({
      domain: [0, 1],
      tickCount: 5,
    });

    expect(instance.getTicks()).toStrictEqual([0, 0.2, 0.4, 0.6, 0.8, 1]);
  });
});
