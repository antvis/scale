import { linerTick } from '../../../src/tick-method/linear';

describe('linear tick method', () => {
  test('test linear tick', () => {
    const res = linerTick({
      domain: [0, 1],
    });
    expect(res).toStrictEqual([0, 0.3, 0.5, 0.8, 1]);
  });

  test('test tickCount option', () => {
    const res = linerTick({
      domain: [0, 1],
      tickCount: 10,
    });
    expect(res).toStrictEqual([0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]);
  });
});
