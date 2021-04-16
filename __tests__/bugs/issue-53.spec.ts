import { Linear } from '../../src';

describe('issue-53', () => {
  test('#53', () => {
    const instance = new Linear({
      domain: [0, 1],
      tickCount: 5,
    });

    expect(instance.getTicks()).toStrictEqual([0, 0.25, 0.5, 0.75, 1]);
  });
});
