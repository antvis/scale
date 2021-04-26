import {
  Interval,
  createInterval,
  IntervalMap,
  DURATION_SECOND,
  DURATION_MINUTE,
  DURATION_HOUR,
  DURATION_DAY,
  DURATION_WEEK,
  DURATION_MONTH,
  DURATION_YEAR,
} from './time-interval';

export const utcMillisecond: Interval = createInterval((date) => new Date(date), 1);

export const utcSecond: Interval = createInterval((date) => {
  const d = new Date(date);
  d.setUTCMilliseconds(0);
  return d;
}, DURATION_SECOND);

export const utcMinute: Interval = createInterval((date) => {
  const d = new Date(date);
  d.setUTCSeconds(0, 0);
  return d;
}, DURATION_MINUTE);

export const utcHour: Interval = createInterval((date) => {
  const d = new Date(date);
  d.setUTCMinutes(0, 0, 0);
  return d;
}, DURATION_HOUR);

export const utcDay: Interval = createInterval((date) => {
  const d = new Date(date);
  d.setUTCHours(0, 0, 0, 0);
  return d;
}, DURATION_DAY);

export const utcWeek: Interval = createInterval((date) => {
  const d = new Date(date);
  d.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 7) % 7));
  d.setUTCHours(0, 0, 0, 0);
  return d;
}, DURATION_WEEK);

export const utcMonth: Interval = createInterval((date) => {
  const d = new Date(date);
  d.setUTCDate(1);
  d.setUTCHours(0, 0, 0, 0);
  return d;
}, DURATION_MONTH);

export const utcYear: Interval = createInterval((date) => {
  const d = new Date(date);
  d.setUTCMonth(0, 1);
  d.setUTCHours(0, 0, 0, 0);
  return d;
}, DURATION_YEAR);

export const utcIntervalMap: IntervalMap = {
  millisecond: utcMillisecond,
  second: utcSecond,
  minute: utcMinute,
  hour: utcHour,
  day: utcDay,
  week: utcWeek,
  month: utcMonth,
  year: utcYear,
};
