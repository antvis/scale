export type TimeTransform = (d: Date) => Date;

export const DURATION_SECOND = 1000;
export const DURATION_MINUTE = DURATION_SECOND * 60;
export const DURATION_HOUR = DURATION_MINUTE * 60;
export const DURATION_DAY = DURATION_HOUR * 24;
export const DURATION_WEEK = DURATION_DAY * 7;
export const DURATION_MONTH = DURATION_DAY * 30;
export const DURATION_YEAR = DURATION_DAY * 365;

export type Interval = {
  floor: TimeTransform;
  // ceil: TimeTransform;
  duration: number;
};

export type IntervalMap = {
  millisecond: Interval;
  second: Interval;
  minute: Interval;
  hour: Interval;
  day: Interval;
  week: Interval;
  month: Interval;
  year: Interval;
};

export function createInterval(floor: TimeTransform, duration: number) {
  // const ceil: TimeTransform = (date) => new Date(+floor(date) + duration);
  return {
    floor,
    // ceil,
    duration,
  };
}

export const millisecond: Interval = createInterval((date) => new Date(date), 1);

export const second: Interval = createInterval((date) => {
  const d = new Date(date);
  d.setMilliseconds(0);
  return d;
}, DURATION_SECOND);

export const minute: Interval = createInterval((date) => {
  const d = new Date(date);
  d.setSeconds(0, 0);
  return d;
}, DURATION_MINUTE);

export const hour: Interval = createInterval((date) => {
  const d = new Date(date);
  d.setMinutes(0, 0, 0);
  return d;
}, DURATION_HOUR);

export const day: Interval = createInterval((date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}, DURATION_DAY);

export const week: Interval = createInterval((date) => {
  const d = new Date(date);
  d.setDate(d.getDate() - (d.getDay() % 7));
  d.setHours(0, 0, 0, 0);
  return d;
}, DURATION_WEEK);

export const month: Interval = createInterval((date) => {
  const d = new Date(date);
  d.setDate(1);
  d.setHours(0, 0, 0, 0);
  return d;
}, DURATION_MONTH);

export const year: Interval = createInterval((date) => {
  const d = new Date(date);
  d.setMonth(0, 1);
  d.setHours(0, 0, 0, 0);
  return d;
}, DURATION_YEAR);

export const localIntervalMap: IntervalMap = {
  millisecond,
  second,
  minute,
  hour,
  day,
  week,
  month,
  year,
};
