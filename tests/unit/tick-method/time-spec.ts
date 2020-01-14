import { getTickMethod } from '../../../src/tick-method/index';
import { timeFormat, toTimeStamp } from '../../../src/util/time';
const dayMask = 'YYYY-MM-DD';
const timeMask = 'HH:mm:ss';
function toStringArr(ticks, mask) {
  return ticks.map(tick => timeFormat(tick, mask));
}

describe('test time ticks', () => {
  const time = getTickMethod('time');
  it('get', () => {
    expect(time).not.toBe(undefined);
  });

  it('seconds 7', () => {
    const ticks = time({
      min: toTimeStamp('2010-01-01 10:00:00'),
      max: toTimeStamp('2010-01-01 10:00:10'),
      tickCount: 7
    });
    expect(toStringArr(ticks, timeMask)).toEqual(["10:00:00", "10:00:02", "10:00:04", "10:00:06", "10:00:08", "10:00:10"]);
  });

  it('seconds 4', () => {
    const ticks = time({
      min: toTimeStamp('2010-01-01 10:00:00'),
      max: toTimeStamp('2010-01-01 10:00:10'),
      tickCount: 4
    });
    expect(toStringArr(ticks, timeMask)).toEqual(["10:00:00", "10:00:03", "10:00:06", "10:00:09", "10:00:12"]);
  });

  it('days', () => {
    const ticks = time({
      min: toTimeStamp('2010-01-01'),
      max: toTimeStamp('2010-01-14'),
      tickCount: 7
    });
    
    expect(toStringArr(ticks, dayMask)).toEqual( ["2010-01-01", "2010-01-03", "2010-01-05", "2010-01-07", "2010-01-09", "2010-01-11", "2010-01-13", "2010-01-15"]);
  });

  it('months', () => {
    const ticks = time({
      min: toTimeStamp('2010-01-01'),
      max: toTimeStamp('2011-01-14'),
      tickCount: 7
    });
    expect(toStringArr(ticks, dayMask)).toEqual(["2010-01-01", "2010-03-04", "2010-05-05", "2010-07-06", "2010-09-06", "2010-11-07", "2011-01-08", "2011-03-11"]);
  });

  it('years', () => {
    const ticks = time({
      min: toTimeStamp('2010-01-01'),
      max: toTimeStamp('2021-09-14'),
      tickCount: 7
    });
    expect(toStringArr(ticks, dayMask)).toEqual(["2010-01-01", "2012-01-31", "2014-03-01", "2016-03-30", "2018-04-29", "2020-05-28", "2022-06-27"]);
  });
});

describe('test time pretty ticks', () => {
  const time = getTickMethod('time-pretty');
  it('get', () => {
    expect(time).not.toBe(undefined);
  });
  it('seconds 7', () => {
    const ticks = time({
      min: toTimeStamp('2010-01-01 10:00:00'),
      max: toTimeStamp('2010-01-01 10:00:10'),
      tickCount: 7
    });
    expect(toStringArr(ticks, timeMask)).toEqual(["10:00:00", "10:00:02", "10:00:04", "10:00:06", "10:00:08", "10:00:10"]);
  });
  it('seconds 4', () => {
    const ticks = time({
      min: toTimeStamp('2010-01-01 10:00:00'),
      max: toTimeStamp('2010-01-01 10:00:10'),
      tickCount: 4
    });
    expect(toStringArr(ticks, timeMask)).toEqual(["10:00:00", "10:00:03", "10:00:06", "10:00:09", "10:00:12"]);
  });
  it('days', () => {
    const ticks = time({
      min: toTimeStamp('2010-01-01'),
      max: toTimeStamp('2010-01-14'),
      tickCount: 7
    });
    
    expect(toStringArr(ticks, dayMask)).toEqual( ["2010-01-01", "2010-01-03", "2010-01-05", "2010-01-07", "2010-01-09", "2010-01-11", "2010-01-13", "2010-01-15"]);
  });

  it('months', () => {
    const ticks = time({
      min: toTimeStamp('2010-01-01'),
      max: toTimeStamp('2011-01-14'),
      tickCount: 7
    });
    expect(toStringArr(ticks, dayMask)).toEqual(["2010-01-01", "2010-03-01", "2010-05-01", "2010-07-01", "2010-09-01", "2010-11-01", "2011-01-01", "2011-03-01"]);
  });

  it('years', () => {
    const ticks = time({
      min: toTimeStamp('2010-01-01'),
      max: toTimeStamp('2021-09-14'),
      tickCount: 7
    });
    expect(toStringArr(ticks, dayMask)).toEqual(["2010-01-01", "2012-01-01", "2014-01-01", "2016-01-01", "2018-01-01", "2020-01-01", "2022-01-01"]);
  });
});