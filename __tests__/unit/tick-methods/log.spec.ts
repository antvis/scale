import { calculateLogTicks } from '../../../src/tick-method/log';

describe('test for log tick methods', () => {
  test('map', () => {
    expect(
      calculateLogTicks({
        base: 10,
        tickCount: 3,
        domain: [1, 100],
      })
    ).toStrictEqual([1, 10, 100]);
  });
});
