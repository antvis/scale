import { d3TimeNice, DURATION_DAY, DURATION_WEEK, DURATION_MONTH, DURATION_YEAR } from '../../../src/utils';

describe('d3TimeNice', () => {
  test('d3TimeNice(lo, hi, count) can nice sub-second domains', () => {
    expect(d3TimeNice(new Date(2013, 0, 1, 12, 0, 0, 0), new Date(2013, 0, 1, 12, 0, 0, 128), 10)).toEqual([
      new Date(2013, 0, 1, 12, 0, 0, 0),
      new Date(2013, 0, 1, 12, 0, 0, 130),
    ]);
  });

  test('d3TimeNice(lo, hi, count) can nice multi-year domains', () => {
    expect(d3TimeNice(new Date(2001, 0, 1), new Date(2138, 0, 1), 10)).toEqual([
      new Date(2000, 0, 1),
      new Date(2140, 0, 1),
    ]);
  });

  test('d3TimeNice(lo, hi, count) nices using the specified tick count', () => {
    const lo = new Date(2009, 0, 1, 0, 17);
    const hi = new Date(2009, 0, 1, 23, 42);
    expect(d3TimeNice(lo, hi, 100)).toEqual([new Date(2009, 0, 1, 0, 15), new Date(2009, 0, 1, 23, 45)]);
    expect(d3TimeNice(lo, hi, 10)).toEqual([new Date(2009, 0, 1), new Date(2009, 0, 2)]);
  });

  test('d3TimeNice(lo, hi, count, interval) nices using the specified time interval', () => {
    const lo = new Date(2009, 0, 1, 0, 12);
    const hi = new Date(2009, 0, 1, 23, 48);
    expect(d3TimeNice(lo, hi, 10, DURATION_DAY)).toEqual([new Date(2009, 0, 1), new Date(2009, 0, 2)]);
    expect(d3TimeNice(lo, hi, 10, DURATION_WEEK)).toEqual([new Date(2008, 11, 28), new Date(2009, 0, 4)]);
    expect(d3TimeNice(lo, hi, 10, DURATION_MONTH)).toEqual([new Date(2009, 0, 1), new Date(2009, 1, 1)]);
    expect(d3TimeNice(lo, hi, 10, DURATION_YEAR)).toEqual([new Date(2009, 0, 1), new Date(2010, 0, 1)]);
  });

  test('d3TimeNice(lo, hi, count, interval) nices using the specified time interval and step', () => {
    const lo = new Date(2009, 0, 1, 0, 12);
    const hi = new Date(2009, 0, 1, 23, 48);
    expect(d3TimeNice(lo, hi, 10, DURATION_DAY * 3)).toEqual([new Date(2009, 0, 1), new Date(2009, 0, 4)]);
    expect(d3TimeNice(lo, hi, 10, DURATION_WEEK * 2)).toEqual([new Date(2008, 11, 28), new Date(2009, 0, 11)]);
    expect(d3TimeNice(lo, hi, 10, DURATION_MONTH * 3)).toEqual([new Date(2009, 0, 1), new Date(2009, 3, 1)]);
    expect(d3TimeNice(lo, hi, 10, DURATION_YEAR * 10)).toEqual([new Date(2000, 0, 1), new Date(2010, 0, 1)]);
  });
});
