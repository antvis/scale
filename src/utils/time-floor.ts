export type Floor = (d: Date) => Date;

export type TimeFloorMap = {
  millisecond: Floor;
  second: Floor;
  minute: Floor;
  hour: Floor;
  day: Floor;
  week: Floor;
  month: Floor;
  year: Floor;
};

export const millisecond: Floor = (date) => new Date(date);

export const second: Floor = (date) => {
  const d = new Date(date);
  d.setMilliseconds(0);
  return d;
};

export const minute: Floor = (date) => {
  const d = new Date(date);
  d.setSeconds(0, 0);
  return d;
};

export const hour: Floor = (date) => {
  const d = new Date(date);
  d.setMinutes(0, 0, 0);
  return d;
};

export const day: Floor = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

export const week: Floor = (date) => {
  const d = new Date(date);
  d.setDate(d.getDate() - (d.getDay() % 7));
  d.setHours(0, 0, 0, 0);
  return d;
};

export const month: Floor = (date) => {
  const d = new Date(date);
  d.setDate(1);
  d.setHours(0, 0, 0, 0);
  return d;
};

export const year: Floor = (date) => {
  const d = new Date(date);
  d.setMonth(0, 1);
  d.setHours(0, 0, 0, 0);
  return d;
};

export const timeFloorMap: TimeFloorMap = {
  millisecond,
  second,
  minute,
  hour,
  day,
  week,
  month,
  year,
};
