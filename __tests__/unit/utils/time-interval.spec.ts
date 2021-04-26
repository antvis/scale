import {
  millisecond,
  second,
  minute,
  hour,
  day,
  week,
  month,
  year,
  localIntervalMap,
  DURATION_SECOND,
  DURATION_MINUTE,
  DURATION_HOUR,
  DURATION_DAY,
  DURATION_WEEK,
  DURATION_MONTH,
  DURATION_YEAR,
} from '../../../src/utils';

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

  test('millisecond(date) returns milliseconds', () => {
    expect(millisecond.duration).toBe(1);

    expect(millisecond.floor(new Date(2021, 11, 31, 23, 59, 59))).toEqual(new Date(2021, 11, 31, 23, 59, 59));
    // expect(millisecond.ceil(new Date(2021, 11, 31, 23, 59, 59))).toEqual(new Date(2022, 0, 1, 0, 0, 0));
  });

  test('second(date) return seconds', () => {
    expect(second.duration).toBe(DURATION_SECOND);

    expect(second.floor(new Date(2021, 11, 31, 23, 59, 59, 999))).toEqual(new Date(2021, 11, 31, 23, 59, 59));
    expect(second.floor(new Date(2021, 0, 1, 0, 0, 0, 0))).toEqual(new Date(2021, 0, 1, 0, 0, 0, 0));
    expect(second.floor(new Date(2021, 0, 1, 0, 0, 0, 1))).toEqual(new Date(2021, 0, 1, 0, 0, 0, 0));

    // expect(second.ceil(new Date(2021, 0, 1, 0, 0, 0, 1))).toEqual(new Date(2021, 0, 1, 0, 0, 1));
  });

  test('minute(date) return minutes', () => {
    expect(minute.duration).toBe(DURATION_MINUTE);

    expect(minute.floor(new Date(2021, 11, 31, 23, 59, 59))).toEqual(new Date(2021, 11, 31, 23, 59));
    expect(minute.floor(new Date(2021, 0, 1, 0, 0, 0))).toEqual(new Date(2021, 0, 1, 0, 0, 0));
    expect(minute.floor(new Date(2021, 0, 1, 0, 0, 1))).toEqual(new Date(2021, 0, 1, 0, 0, 0));
  });

  test('hour(date) return hours', () => {
    expect(hour.duration).toBe(DURATION_HOUR);

    expect(hour.floor(new Date(2021, 11, 31, 23, 59))).toEqual(new Date(2021, 11, 31, 23));
    expect(hour.floor(new Date(2021, 0, 1, 0, 0))).toEqual(new Date(2021, 0, 1, 0, 0));
    expect(hour.floor(new Date(2021, 0, 1, 0, 1))).toEqual(new Date(2021, 0, 1, 0, 0));
  });

  test('day(date) return days', () => {
    expect(day.duration).toBe(DURATION_DAY);

    expect(day.floor(new Date(2021, 3, 25, 23))).toEqual(new Date(2021, 3, 25));
    expect(day.floor(new Date(2021, 3, 25))).toEqual(new Date(2021, 3, 25));
    expect(day.floor(new Date(2021, 3, 25, 1))).toEqual(new Date(2021, 3, 25));
  });

  test('week(date) return weeks', () => {
    expect(week.duration).toBe(DURATION_WEEK);

    expect(week.floor(new Date(2021, 3, 24))).toEqual(new Date(2021, 3, 18));
    expect(week.floor(new Date(2021, 3, 25))).toEqual(new Date(2021, 3, 25));
    expect(week.floor(new Date(2021, 3, 26))).toEqual(new Date(2021, 3, 25));
  });

  test('month(date) return month', () => {
    expect(month.duration).toBe(DURATION_MONTH);

    expect(month.floor(new Date(2021, 0, 31))).toEqual(new Date(2021, 0));
    expect(month.floor(new Date(2021, 1, 1))).toEqual(new Date(2021, 1));
    expect(month.floor(new Date(2021, 1, 2))).toEqual(new Date(2021, 1));
  });

  test('year(date) return weeks', () => {
    expect(year.duration).toBe(DURATION_YEAR);

    expect(year.floor(new Date(2021, 0))).toEqual(new Date(2021, 0));
    expect(year.floor(new Date(2021, 3))).toEqual(new Date(2021, 0));
    expect(year.floor(new Date(2021, 11))).toEqual(new Date(2021, 0));
  });
});
