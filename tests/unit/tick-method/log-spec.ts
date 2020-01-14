import { getTickMethod } from '../../../src/tick-method/index';

describe('test log ticks', () => {
  const log = getTickMethod('log');
  it('get', () => {
    expect(log).not.toEqual(undefined);
  });

  it('all > 1', () => {
    const ticks = log({
      min: 1,
      base: 10,
      tickCount: 5,
      max: 10000
    });
    expect(ticks).toEqual([1, 10, 100, 1000, 10000]);
  });

  it('all > 1, tickCount = 10', () => {
    const ticks = log({
      min: 1,
      base: 10,
      tickCount: 5,
      max: 1000000000
    });
    expect(ticks).toEqual([1, 100, 10000, 1000000, 100000000, 10000000000]);
  });

  it('all > 1, tickCount = 10', () => {
    const ticks = log({
      min: 1,
      base: 10,
      tickCount: 10,
      max: 10000
    });
    expect(ticks).toEqual([1, 10, 100, 1000, 10000]);
  });

  it('all < 1', () => {
    const ticks = log({
      min: 0.001,
      base: 10,
      tickCount: 5,
      max: 1
    });
    expect(ticks).toEqual([0.001,0.01,0.1, 1]);
  });

  it('min = 0, no values', () => {
    const ticks = log({
      min: 0,
      base: 10,
      tickCount: 5,
      max: 10
    });
    expect(ticks).toEqual([0, 1, 10]);
  });

  it('min = 0, have values', () => {
    const ticks = log({
      min: 0,
      values: [0, 0.001, 2],
      base: 10,
      tickCount: 5,
      max: 10
    });
    expect(ticks).toEqual([0, 0.001, 0.01, 0.1, 1, 10]);
  });

  it('min < 0, have values', () => {
    const ticks = log({
      min: -10,
      values: [-10, 0.001, 2],
      base: 10,
      tickCount: 5,
      max: 10
    });
    expect(ticks).toEqual([0, 0.001, 0.01, 0.1, 1, 10]);
  });
});