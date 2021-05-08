import { millisecond, second, minute, hour, day, week, month, year, localIntervalMap } from '../../../src/utils';

import {
  DURATION_SECOND,
  DURATION_MINUTE,
  DURATION_HOUR,
  DURATION_DAY,
  DURATION_WEEK,
  DURATION_MONTH,
  DURATION_YEAR,
} from '../../../src';

describe('time floor', () => {
  test('defaults durations', () => {
    expect(DURATION_SECOND).toBe(1000);
    expect(DURATION_MINUTE).toBe(DURATION_SECOND * 60);
    expect(DURATION_HOUR).toBe(DURATION_MINUTE * 60);
    expect(DURATION_DAY).toBe(DURATION_HOUR * 24);
    expect(DURATION_WEEK).toBe(DURATION_DAY * 7);
    expect(DURATION_MONTH).toBe(DURATION_DAY * 30);
    expect(DURATION_YEAR).toBe(DURATION_DAY * 365);
  });

  test('intervalMap has expected defaults', () => {
    expect(localIntervalMap.millisecond).toEqual(millisecond);
    expect(localIntervalMap.second).toEqual(second);
    expect(localIntervalMap.minute).toEqual(minute);
    expect(localIntervalMap.hour).toEqual(hour);
    expect(localIntervalMap.day).toEqual(day);
    expect(localIntervalMap.week).toEqual(week);
    expect(localIntervalMap.month).toEqual(month);
    expect(localIntervalMap.year).toEqual(year);
  });

  test('millisecond.fn(date) returns milliseconds', () => {
    expect(millisecond.duration).toBe(1);
    expect(millisecond.floor(new Date(2021, 11, 31, 23, 59, 59))).toEqual(new Date(2021, 11, 31, 23, 59, 59));
    expect(millisecond.ceil(new Date(2021, 11, 31, 23, 59, 59, 999))).toEqual(new Date(2021, 11, 31, 23, 59, 59, 999));

    expect(millisecond.range(new Date(2021, 5, 1, 1, 1, 1, 1), new Date(2021, 5, 1, 1, 1, 1, 11), 3)).toEqual([
      new Date(2021, 5, 1, 1, 1, 1, 1),
      new Date(2021, 5, 1, 1, 1, 1, 4),
      new Date(2021, 5, 1, 1, 1, 1, 7),
      new Date(2021, 5, 1, 1, 1, 1, 10),
    ]);
  });

  test('second.fn(date) return seconds', () => {
    expect(second.duration).toBe(DURATION_SECOND);
    expect(second.floor(new Date(2021, 11, 31, 23, 59, 59, 999))).toEqual(new Date(2021, 11, 31, 23, 59, 59));
    expect(second.floor(new Date(2021, 0, 1, 0, 0, 0, 0))).toEqual(new Date(2021, 0, 1, 0, 0, 0, 0));
    expect(second.floor(new Date(2021, 0, 1, 0, 0, 0, 1))).toEqual(new Date(2021, 0, 1, 0, 0, 0, 0));

    expect(second.ceil(new Date(2021, 0, 1, 0, 0, 0, 999))).toEqual(new Date(2021, 0, 1, 0, 0, 1));
    expect(second.ceil(new Date(2021, 0, 1, 0, 0, 1))).toEqual(new Date(2021, 0, 1, 0, 0, 1));

    expect(second.range(new Date(2021, 5, 1, 1, 1, 1), new Date(2021, 5, 1, 1, 1, 11), 3)).toEqual([
      new Date(2021, 5, 1, 1, 1, 1),
      new Date(2021, 5, 1, 1, 1, 4),
      new Date(2021, 5, 1, 1, 1, 7),
      new Date(2021, 5, 1, 1, 1, 10),
    ]);
  });

  test('minute.fn(date) return minutes', () => {
    expect(minute.duration).toBe(DURATION_MINUTE);

    expect(minute.floor(new Date(2021, 11, 31, 23, 59, 59))).toEqual(new Date(2021, 11, 31, 23, 59));
    expect(minute.floor(new Date(2021, 0, 1, 0, 0, 0))).toEqual(new Date(2021, 0, 1, 0, 0, 0));
    expect(minute.floor(new Date(2021, 0, 1, 0, 0, 1))).toEqual(new Date(2021, 0, 1, 0, 0, 0));

    expect(minute.ceil(new Date(2021, 0, 1, 0, 0, 59))).toEqual(new Date(2021, 0, 1, 0, 1, 0));
    expect(minute.ceil(new Date(2021, 0, 1, 0, 1))).toEqual(new Date(2021, 0, 1, 0, 1));

    expect(minute.range(new Date(2021, 5, 1, 1, 1), new Date(2021, 5, 1, 1, 11), 3)).toEqual([
      new Date(2021, 5, 1, 1, 1),
      new Date(2021, 5, 1, 1, 4),
      new Date(2021, 5, 1, 1, 7),
      new Date(2021, 5, 1, 1, 10),
    ]);
  });

  test('hour.fn(date) return hours', () => {
    expect(hour.duration).toBe(DURATION_HOUR);

    expect(hour.floor(new Date(2021, 11, 31, 23, 59))).toEqual(new Date(2021, 11, 31, 23));
    expect(hour.floor(new Date(2021, 0, 1, 0, 0))).toEqual(new Date(2021, 0, 1, 0, 0));
    expect(hour.floor(new Date(2021, 0, 1, 0, 1))).toEqual(new Date(2021, 0, 1, 0, 0));

    expect(hour.ceil(new Date(2021, 0, 1, 0, 59))).toEqual(new Date(2021, 0, 1, 1));
    expect(hour.ceil(new Date(2021, 0, 1, 1))).toEqual(new Date(2021, 0, 1, 1));

    expect(hour.range(new Date(2021, 5, 1, 1), new Date(2021, 5, 1, 11), 3)).toEqual([
      new Date(2021, 5, 1, 1),
      new Date(2021, 5, 1, 4),
      new Date(2021, 5, 1, 7),
      new Date(2021, 5, 1, 10),
    ]);
  });

  test('day.fn(date) return days', () => {
    expect(day.duration).toBe(DURATION_DAY);

    expect(day.floor(new Date(2021, 3, 25, 23))).toEqual(new Date(2021, 3, 25));
    expect(day.floor(new Date(2021, 3, 25))).toEqual(new Date(2021, 3, 25));
    expect(day.floor(new Date(2021, 3, 25, 1))).toEqual(new Date(2021, 3, 25));

    expect(day.ceil(new Date(2021, 0, 1, 23))).toEqual(new Date(2021, 0, 2));
    expect(day.ceil(new Date(2021, 0, 1))).toEqual(new Date(2021, 0, 1));

    expect(day.range(new Date(2021, 5, 1), new Date(2021, 5, 11), 3)).toEqual([
      new Date(2021, 5, 1),
      new Date(2021, 5, 4),
      new Date(2021, 5, 7),
      new Date(2021, 5, 10),
    ]);
  });

  test('week.fn(date) return weeks', () => {
    expect(week.duration).toBe(DURATION_WEEK);

    expect(week.floor(new Date(2021, 3, 24))).toEqual(new Date(2021, 3, 18));
    expect(week.floor(new Date(2021, 3, 25))).toEqual(new Date(2021, 3, 25));
    expect(week.floor(new Date(2021, 3, 26))).toEqual(new Date(2021, 3, 25));

    expect(week.ceil(new Date(2021, 3, 18))).toEqual(new Date(2021, 3, 18));
    expect(week.ceil(new Date(2021, 3, 24))).toEqual(new Date(2021, 3, 25));
  });

  test('month.fn(date) return month', () => {
    expect(month.duration).toBe(DURATION_MONTH);

    expect(month.floor(new Date(2021, 0, 31))).toEqual(new Date(2021, 0));
    expect(month.floor(new Date(2021, 1, 1))).toEqual(new Date(2021, 1));
    expect(month.floor(new Date(2021, 1, 2))).toEqual(new Date(2021, 1));

    expect(month.ceil(new Date(2021, 0, 31))).toEqual(new Date(2021, 1));
    expect(month.ceil(new Date(2021, 0))).toEqual(new Date(2021, 0));

    expect(month.range(new Date(2021, 1), new Date(2021, 11), 3)).toEqual([
      new Date(2021, 1),
      new Date(2021, 4),
      new Date(2021, 7),
      new Date(2021, 10),
    ]);
  });

  test('year.fn(date) return years', () => {
    expect(year.duration).toBe(DURATION_YEAR);

    expect(year.floor(new Date(2021, 0))).toEqual(new Date(2021, 0));
    expect(year.floor(new Date(2021, 3))).toEqual(new Date(2021, 0));
    expect(year.floor(new Date(2021, 11))).toEqual(new Date(2021, 0));

    expect(year.ceil(new Date(2021, 11))).toEqual(new Date(2022, 0));
    expect(year.ceil(new Date(2021, 0))).toEqual(new Date(2021, 0));

    expect(year.range(new Date(2001, 0), new Date(2011, 0), 3)).toEqual([
      new Date(2001, 0),
      new Date(2004, 0),
      new Date(2007, 0),
      new Date(2010, 0),
    ]);
  });
});
