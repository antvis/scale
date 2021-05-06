import { d3Time } from '../../../src/tick-methods/d3-time';

describe('d3Time', () => {
  test('d3Time(start, stop, count) can generate sub-second ticks', () => {
    expect(d3Time(new Date(2011, 0, 1, 12, 0, 0), new Date(2011, 0, 1, 12, 0, 1), 4)).toEqual([
      new Date(2011, 0, 1, 12, 0, 0, 0),
      new Date(2011, 0, 1, 12, 0, 0, 200),
      new Date(2011, 0, 1, 12, 0, 0, 400),
      new Date(2011, 0, 1, 12, 0, 0, 600),
      new Date(2011, 0, 1, 12, 0, 0, 800),
      new Date(2011, 0, 1, 12, 0, 1, 0),
    ]);
  });

  test('d3Time(start, stop, count) can generate 1-second ticks', () => {
    expect(d3Time(new Date(2011, 0, 1, 12, 0, 0), new Date(2011, 0, 1, 12, 0, 4), 4)).toEqual([
      new Date(2011, 0, 1, 12, 0, 0),
      new Date(2011, 0, 1, 12, 0, 1),
      new Date(2011, 0, 1, 12, 0, 2),
      new Date(2011, 0, 1, 12, 0, 3),
      new Date(2011, 0, 1, 12, 0, 4),
    ]);
  });

  test('d3Time(start, stop, count) can generate 5-second ticks', () => {
    expect(d3Time(new Date(2011, 0, 1, 12, 0, 0), new Date(2011, 0, 1, 12, 0, 20), 4)).toEqual([
      new Date(2011, 0, 1, 12, 0, 0),
      new Date(2011, 0, 1, 12, 0, 5),
      new Date(2011, 0, 1, 12, 0, 10),
      new Date(2011, 0, 1, 12, 0, 15),
      new Date(2011, 0, 1, 12, 0, 20),
    ]);
  });

  test('d3Time(start, stop, count) can generate 15-second ticks', () => {
    expect(d3Time(new Date(2011, 0, 1, 12, 0, 0), new Date(2011, 0, 1, 12, 0, 50), 4)).toEqual([
      new Date(2011, 0, 1, 12, 0, 0),
      new Date(2011, 0, 1, 12, 0, 15),
      new Date(2011, 0, 1, 12, 0, 30),
      new Date(2011, 0, 1, 12, 0, 45),
    ]);
  });

  test('d3Time(start, stop, count) can generate 30-second ticks', () => {
    expect(d3Time(new Date(2011, 0, 1, 12, 0, 0), new Date(2011, 0, 1, 12, 1, 50), 4)).toEqual([
      new Date(2011, 0, 1, 12, 0, 0),
      new Date(2011, 0, 1, 12, 0, 30),
      new Date(2011, 0, 1, 12, 1, 0),
      new Date(2011, 0, 1, 12, 1, 30),
    ]);
  });

  test('d3Time(start, stop, count) can generate 1-minute ticks', () => {
    expect(d3Time(new Date(2011, 0, 1, 12, 0, 27), new Date(2011, 0, 1, 12, 4, 12), 4)).toEqual([
      new Date(2011, 0, 1, 12, 1),
      new Date(2011, 0, 1, 12, 2),
      new Date(2011, 0, 1, 12, 3),
      new Date(2011, 0, 1, 12, 4),
    ]);
  });

  test('d3Time(start, stop, count) can generate 5-minute ticks', () => {
    expect(d3Time(new Date(2011, 0, 1, 12, 3, 27), new Date(2011, 0, 1, 12, 21, 12), 4)).toEqual([
      new Date(2011, 0, 1, 12, 5),
      new Date(2011, 0, 1, 12, 10),
      new Date(2011, 0, 1, 12, 15),
      new Date(2011, 0, 1, 12, 20),
    ]);
  });

  test('d3Time(start, stop, count) can generate 15-minute ticks', () => {
    expect(d3Time(new Date(2011, 0, 1, 12, 8, 27), new Date(2011, 0, 1, 13, 4, 12), 4)).toEqual([
      new Date(2011, 0, 1, 12, 15),
      new Date(2011, 0, 1, 12, 30),
      new Date(2011, 0, 1, 12, 45),
      new Date(2011, 0, 1, 13, 0),
    ]);
  });

  test('d3Time(start, stop, count) can generate 30-minute ticks', () => {
    expect(d3Time(new Date(2011, 0, 1, 12, 28, 27), new Date(2011, 0, 1, 14, 4, 12), 4)).toEqual([
      new Date(2011, 0, 1, 12, 30),
      new Date(2011, 0, 1, 13, 0),
      new Date(2011, 0, 1, 13, 30),
      new Date(2011, 0, 1, 14, 0),
    ]);
  });

  test('d3Time(start, stop, count) can generate 1-hour ticks', () => {
    expect(d3Time(new Date(2011, 0, 1, 12, 28, 27), new Date(2011, 0, 1, 16, 34, 12), 4)).toEqual([
      new Date(2011, 0, 1, 13, 0),
      new Date(2011, 0, 1, 14, 0),
      new Date(2011, 0, 1, 15, 0),
      new Date(2011, 0, 1, 16, 0),
    ]);
  });

  test('d3Time(start, stop, count) can generate 3-hour ticks', () => {
    expect(d3Time(new Date(2011, 0, 1, 14, 28, 27), new Date(2011, 0, 2, 1, 34, 12), 4)).toEqual([
      new Date(2011, 0, 1, 15, 0),
      new Date(2011, 0, 1, 18, 0),
      new Date(2011, 0, 1, 21, 0),
      new Date(2011, 0, 2, 0, 0),
    ]);
  });

  test('d3Time(start, stop, count) can generate 6-hour ticks', () => {
    expect(d3Time(new Date(2011, 0, 1, 16, 28, 27), new Date(2011, 0, 2, 14, 34, 12), 4)).toEqual([
      new Date(2011, 0, 1, 18, 0),
      new Date(2011, 0, 2, 0, 0),
      new Date(2011, 0, 2, 6, 0),
      new Date(2011, 0, 2, 12, 0),
    ]);
  });

  test('d3Time(start, stop, count) can generate 12-hour ticks', () => {
    expect(d3Time(new Date(2011, 0, 1, 16, 28, 27), new Date(2011, 0, 3, 21, 34, 12), 4)).toEqual([
      new Date(2011, 0, 2, 0, 0),
      new Date(2011, 0, 2, 12, 0),
      new Date(2011, 0, 3, 0, 0),
      new Date(2011, 0, 3, 12, 0),
    ]);
  });

  test('d3Time(start, stop, count) can generate 1-day ticks', () => {
    expect(d3Time(new Date(2011, 0, 1, 16, 28, 27), new Date(2011, 0, 5, 21, 34, 12), 4)).toEqual([
      new Date(2011, 0, 2, 0, 0),
      new Date(2011, 0, 3, 0, 0),
      new Date(2011, 0, 4, 0, 0),
      new Date(2011, 0, 5, 0, 0),
    ]);
  });

  test('d3Time(start, stop, count) can generate 2-day ticks', () => {
    expect(d3Time(new Date(2011, 0, 2, 16, 28, 27), new Date(2011, 0, 9, 21, 34, 12), 4)).toEqual([
      new Date(2011, 0, 3, 0, 0),
      new Date(2011, 0, 5, 0, 0),
      new Date(2011, 0, 7, 0, 0),
      new Date(2011, 0, 9, 0, 0),
    ]);
  });

  test('d3Time(start, stop, count) can generate 1-week ticks', () => {
    expect(d3Time(new Date(2011, 0, 1, 16, 28, 27), new Date(2011, 0, 23, 21, 34, 12), 4)).toEqual([
      new Date(2011, 0, 2, 0, 0),
      new Date(2011, 0, 9, 0, 0),
      new Date(2011, 0, 16, 0, 0),
      new Date(2011, 0, 23, 0, 0),
    ]);
  });

  test('d3Time(start, stop, count) can generate 1-month ticks', () => {
    expect(d3Time(new Date(2011, 0, 18), new Date(2011, 4, 2), 4)).toEqual([
      new Date(2011, 1, 1, 0, 0),
      new Date(2011, 2, 1, 0, 0),
      new Date(2011, 3, 1, 0, 0),
      new Date(2011, 4, 1, 0, 0),
    ]);
  });

  test('d3Time(start, stop, count) can generate 3-month ticks', () => {
    expect(d3Time(new Date(2010, 11, 18), new Date(2011, 10, 2), 4)).toEqual([
      new Date(2011, 0, 1, 0, 0),
      new Date(2011, 3, 1, 0, 0),
      new Date(2011, 6, 1, 0, 0),
      new Date(2011, 9, 1, 0, 0),
    ]);
  });

  test('d3Time(start, stop, count) can generate 1-year ticks', () => {
    expect(d3Time(new Date(2010, 11, 18), new Date(2014, 2, 2), 4)).toEqual([
      new Date(2011, 0, 1, 0, 0),
      new Date(2012, 0, 1, 0, 0),
      new Date(2013, 0, 1, 0, 0),
      new Date(2014, 0, 1, 0, 0),
    ]);
  });

  test('d3Time(start, stop, count) can generate multi-year ticks', () => {
    const start = new Date(-1, 11, 18);
    start.setFullYear(0);
    expect(d3Time(start, new Date(2014, 2, 2), 6)).toEqual([
      new Date(500, 0, 1, 0, 0),
      new Date(1000, 0, 1, 0, 0),
      new Date(1500, 0, 1, 0, 0),
      new Date(2000, 0, 1, 0, 0),
    ]);
  });
});
