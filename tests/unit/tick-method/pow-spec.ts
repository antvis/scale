import { getTickMethod } from '../../../src/tick-method/index';

describe('test pow ticks', () => {
  const pow = getTickMethod('pow');
  it('get', () => {
    expect(pow).not.toEqual(undefined);
  });

  it('calculate ticks', () => {
    const ticks = pow({
      min: 0,
      max: 100,
      exponent: 2,
      tickCount: 5
    });
    expect(ticks).toEqual([0, 4, 16, 36, 64, 100]);
  });

  it('calculate ticks', () => {
    const ticks = pow({
      min: 0,
      max: 1000,
      exponent: 2,
      tickCount: 5
    });
    expect(ticks).toEqual([0, 25, 100, 225, 400, 625, 900, 1225]);
  });

  it('min < 0', () => {
    const ticks = pow({
      min: -1000,
      max: 1000,
      exponent: 2,
      tickCount: 5
    });
    expect(ticks).toEqual([-1600, -900, -400, -100, 0, 100, 400, 900, 1600]);
  });

  it('range very little', () => {
    const ticks = pow({
      min: 0,
      max: 10,
      exponent: 2,
      tickCount: 5
    });
    expect(ticks).toEqual([0, 1, 4, 9, 16]);
  });
  
  it('tickCount > 10', () => {
    const ticks = pow({
      min: 0,
      max: 10,
      exponent: 2,
      tickCount: 10
    });
    expect(ticks).toEqual([0, 0.25, 1, 2.25, 4, 6.25, 9, 12.25, 16]);
  });
});