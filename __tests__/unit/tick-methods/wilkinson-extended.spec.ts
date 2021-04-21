import { wilkinsonExtended } from '../../../src';

describe('wilkinson-extended test', () => {
  test('invalid data for dMin and dMax', () => {
    const res1 = wilkinsonExtended(NaN, NaN);
    expect(res1).toStrictEqual([]);

    // @ts-ignore
    const res2 = wilkinsonExtended('666666', '66666');
    expect(res2).toStrictEqual([]);
  });

  test('domain delta is smaller than 1e-15', () => {
    const res1 = wilkinsonExtended(0, 1e-16);
    expect(res1).toStrictEqual([0]);
  });

  test('m is to equal to ', () => {
    const res1 = wilkinsonExtended(0, 100, 1);
    expect(res1).toStrictEqual([0]);
  });

  test('common usage', () => {
    const res1 = wilkinsonExtended(0, 100, 10);
    expect(res1).toStrictEqual([0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);
  });

  test('tiny number', () => {
    expect(wilkinsonExtended(0, 0.1, 5)).toStrictEqual([0, 0.025, 0.05, 0.075, 0.1]);
    expect(wilkinsonExtended(0, 0.01, 5)).toStrictEqual([0, 0.0025, 0.005, 0.0075, 0.01]);
  });
});
