import { d3LinearNice } from '../../../src/utils/d3-linear-nice';

describe('test for d3-liner-nice', () => {
  test('default nice', () => {
    expect(d3LinearNice([1.1, 10.9])).toStrictEqual([1, 11]);
    expect(d3LinearNice([10.9, 1.1])).toStrictEqual([11, 1]);
    expect(d3LinearNice([0.7, 11.001])).toStrictEqual([0, 12]);
    expect(d3LinearNice([123.1, 6.7])).toStrictEqual([130, 0]);
  });

  test('custom step', () => {
    expect(d3LinearNice([0, 15], 5)).toStrictEqual([0, 20]);
    expect(d3LinearNice([0, 14.1], 5)).toStrictEqual([0, 20]);
    expect(d3LinearNice([0.5, 0.5], 5)).toStrictEqual([0.5, 0.5]);
  });

  test('small number for domain', () => {
    expect(d3LinearNice([0.4, 0.6], 5)).toStrictEqual([0.4, 0.6]);
  });
});
