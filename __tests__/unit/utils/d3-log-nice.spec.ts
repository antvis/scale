import { d3LogNice } from '../../../src/utils';

describe('d3LogNice', () => {
  test('d3LogNice(a, b, base) nices the a, b, extending it to powers of ten', () => {
    expect(d3LogNice(10.9, 1.1, 0, 10)).toEqual([100, 1]);
    expect(d3LogNice(0.7, 11.001, 0, 10)).toEqual([0.1, 100]);
    expect(d3LogNice(123.1, 6.7, 0, 10)).toEqual([1000, 1]);
    expect(d3LogNice(0.01, 0.49, 0, 10)).toEqual([0.01, 1]);
    expect(d3LogNice(1.5, 50, 0, 10)).toEqual([1, 100]);
    expect(d3LogNice(50, 1.5, 0, 10)).toEqual([100, 1]);
  });
});
