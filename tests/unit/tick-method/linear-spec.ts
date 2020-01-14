import { getTickMethod } from '../../../src/tick-method/index';

describe('test wilkinson extended', () => {
  const linear = getTickMethod('wilkinson-extended');
  it('get', () => {
    expect(linear).not.toBe(undefined);
  });
  it('nice true', () => {
    const ticks = linear({
      min: 50,
      max: 450
    });
    expect(ticks).toEqual([0, 100, 200, 300, 400, 500]);
  });

  it('nice false', () => {
    const ticks = linear({
      min: 50,
      max: 450,
      nice: false
    });
    expect(ticks).toEqual([0, 100, 200, 300, 400]);
  });
});

describe('test R pretty', () => {
  const linear = getTickMethod('r-pretty');
  it('get', () => {
    expect(linear).not.toBe(undefined);
  });
  it('nice true', () => {
    const ticks = linear({
      min: 50,
      max: 450
    });
    expect(ticks).toEqual([0, 100, 200, 300, 400, 500]);
  });

  it('nice false', () => {
    const ticks = linear({
      min: 50,
      max: 450,
      nice: false // r-pretty nice 无效
    });
    expect(ticks).toEqual([0, 100, 200, 300, 400, 500]);
  });
});