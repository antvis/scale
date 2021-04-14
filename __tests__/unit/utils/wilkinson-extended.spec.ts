import { wilkinsonExtended } from '../../../src/utils/wilkinson-extended';

describe('wilkinson-extended test', () => {
  test('invalid data for dMin and dMax', () => {
    const res1 = wilkinsonExtended(NaN, NaN);
    expect(res1).toStrictEqual({
      min: 0,
      max: 0,
      ticks: [],
    });

    // @ts-ignore
    const res2 = wilkinsonExtended('666666', '66666');
    expect(res2).toStrictEqual({
      min: 0,
      max: 0,
      ticks: [],
    });
  });

  test('domain delta is smaller than 1e-15', () => {
    const res1 = wilkinsonExtended(0, 1e-16);
    expect(res1).toStrictEqual({
      min: 0,
      max: 1e-16,
      ticks: [0],
    });
  });

  test('m is to equal to ', () => {
    const res1 = wilkinsonExtended(0, 100, 1);
    expect(res1).toStrictEqual({
      min: 0,
      max: 100,
      ticks: [0],
    });
  });

  test('common usage', () => {
    const res1 = wilkinsonExtended(0, 100, 10);
    expect(res1).toStrictEqual({
      max: 100,
      min: 0,
      ticks: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    });
  });
});
