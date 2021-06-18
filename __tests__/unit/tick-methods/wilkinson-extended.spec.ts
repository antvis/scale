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
    expect(wilkinsonExtended(0, 0.001, 5)).toStrictEqual([0, 0.00025, 0.0005, 0.00075, 0.001]);
    expect(wilkinsonExtended(0, 0.0001, 6)).toStrictEqual([0, 0.00002, 0.00004, 0.00006, 0.00008, 0.0001, 0.00012]);
    expect(wilkinsonExtended(0, 0.00001, 6)).toStrictEqual([
      0, 0.000002, 0.000004, 0.000006, 0.000008, 0.00001, 0.000012,
    ]);
    expect(wilkinsonExtended(0, 0.000001, 6)).toStrictEqual([0, 0.0000002, 0.0000004, 0.0000006, 0.0000008, 0.000001]);
    expect(wilkinsonExtended(0, 1e-15, 6)).toStrictEqual([0, 2e-16, 4e-16, 6e-16, 8e-16, 1e-15]);
  });

  test('precision', () => {
    expect(wilkinsonExtended(0, 1.2, 5)).toStrictEqual([0, 0.3, 0.6, 0.9, 1.2]);
  });
});
