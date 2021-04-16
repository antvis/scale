import { calculateLinearTicks } from '../../../src/tick-method/calculateLinearTicks';

describe('linear tick method', () => {
  test('test linear tick', () => {
    const res = calculateLinearTicks({
      domain: [0, 1],
    });
    expect(res).toStrictEqual([0, 0.25, 0.5, 0.75, 1]);
  });

  test('small number', () => {
    const res = calculateLinearTicks({
      domain: [0, 0.001],
    });
    expect(res).toStrictEqual([0, 0.00025, 0.0005, 0.00075, 0.001]);
  });

  test('test tickCount option', () => {
    const res = calculateLinearTicks({
      domain: [0, 1],
      tickCount: 10,
    });
    expect(res).toStrictEqual([0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]);
  });
});
