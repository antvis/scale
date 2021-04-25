import { Floor, TimeFloorMap } from './time-floor';

export const utcMillisecond: Floor = (date) => new Date(date);

export const utcSecond: Floor = (date) => {
  const d = new Date(date);
  d.setUTCMilliseconds(0);
  return d;
};

export const utcMinute: Floor = (date) => {
  const d = new Date(date);
  d.setUTCSeconds(0, 0);
  return d;
};

export const utcHour: Floor = (date) => {
  const d = new Date(date);
  d.setUTCMinutes(0, 0, 0);
  return d;
};

export const utcDay: Floor = (date) => {
  const d = new Date(date);
  d.setUTCHours(0, 0, 0, 0);
  return d;
};

export const utcWeek: Floor = (date) => {
  const d = new Date(date);
  d.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 7) % 7));
  d.setUTCHours(0, 0, 0, 0);
  return d;
};

export const utcMonth: Floor = (date) => {
  const d = new Date(date);
  d.setUTCDate(1);
  d.setUTCHours(0, 0, 0, 0);
  return d;
};

export const utcYear: Floor = (date) => {
  const d = new Date(date);
  d.setUTCMonth(0, 1);
  d.setUTCHours(0, 0, 0, 0);
  return d;
};

export const utcFloorMap: TimeFloorMap = {
  millisecond: utcMillisecond,
  second: utcSecond,
  minute: utcMinute,
  hour: utcHour,
  day: utcDay,
  week: utcWeek,
  month: utcMonth,
  year: utcYear,
};
