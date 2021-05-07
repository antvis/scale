import { TickMethod } from '../types';
import { Interval, tickStep, utcIntervalMap, localIntervalMap, bisect } from '../utils';

type TickInterval = [Interval, number];

function chooseTickIntervals(utc: boolean): { year: Interval; millisecond: Interval; tickIntervals: TickInterval[] } {
  const intervalMap = utc ? utcIntervalMap : localIntervalMap;
  const { year, month, week, day, hour, minute, second, millisecond } = intervalMap;
  const tickIntervals: TickInterval[] = [
    [second, 1],
    [second, 5],
    [second, 15],
    [second, 30],
    [minute, 1],
    [minute, 5],
    [minute, 15],
    [minute, 30],
    [hour, 1],
    [hour, 3],
    [hour, 6],
    [hour, 12],
    [day, 1],
    [day, 2],
    [week, 1],
    [month, 1],
    [month, 3],
    [year, 1],
  ];
  return {
    tickIntervals,
    year,
    millisecond,
  };
}

export function findTickInterval(start: Date, stop: Date, count: number, interval: number, utc: boolean) {
  const lo = +start;
  const hi = +stop;
  const { tickIntervals, year, millisecond } = chooseTickIntervals(utc);
  const getter = ([interval, count]) => interval.duration * count;
  const targetCount = interval ? (hi - lo) / interval : count || 5;
  const targetInterval = interval || (hi - lo) / targetCount;

  const len = tickIntervals.length;
  const i = bisect(tickIntervals, targetInterval, 0, len, getter);
  let matchInterval: TickInterval;
  if (i === len) {
    const step = tickStep(lo / year.duration, hi / year.duration, targetCount);
    matchInterval = [year, step];
  } else if (i) {
    const closeToLow = targetInterval / getter(tickIntervals[i - 1]) < getter(tickIntervals[i]) / targetInterval;
    const [timeInterval, targetStep] = closeToLow ? tickIntervals[i - 1] : tickIntervals[i];
    const step = interval ? Math.ceil(interval / timeInterval.duration) : targetStep;
    matchInterval = [timeInterval, step];
  } else {
    const step = Math.max(tickStep(lo, hi, targetCount), 1);
    matchInterval = [millisecond, step];
  }
  return matchInterval;
}

export const d3Time: TickMethod<Date> = (min, max, count, interval, utc: boolean) => {
  const r = min > max;
  const lo = r ? max : min;
  const hi = r ? min : max;
  const [tickInterval, step] = findTickInterval(lo, hi, count, interval, utc);
  const ticks = tickInterval ? tickInterval.range(lo, new Date(+hi + 1), step, true) : [];
  return r ? ticks.reverse() : ticks;
};
