import Linear from '../../src/continuous/linear';
import '../../src/tick-method/index';

describe('linear scale', () => {
  const scale = new Linear({
    min: 0,
    max: 100,
    formatter(val) {
      return val + '元';
    },
  });

  it('type', function() {
    expect(scale.type).toEqual('linear');
    expect(scale.isLinear).toBeTruthy();
  });

  it('config', () => {
    expect(scale.min).toEqual(0);
    expect(scale.max).toEqual(100);
    expect(scale.type).toEqual('linear');
  });

  it('scale func', () => {
    expect(scale.scale(50)).toEqual(0.5);
    expect(scale.scale(0)).toEqual(0);
    expect(scale.scale(100)).toEqual(1);
    expect(scale.scale(null)).toBeNaN();
  });

  it('invert func', () => {
    expect(scale.invert(0)).toEqual(0);
    expect(scale.invert(0.5)).toEqual(50);
    expect(scale.invert(1)).toEqual(100);
  });

  it('getText func', () => {
    expect(scale.getText(5)).toEqual('5元');
  });

  it('getTicks func', () => {
    const ticks = scale.getTicks();
    expect(ticks.length).not.toEqual(0);
    expect(ticks[0].value).toEqual(0);
    expect(ticks[ticks.length - 1].value).toEqual(1);
  });

  it('change func', () => {
    scale.change({
      min: 10,
      max: 110,
      nice: true,
    });
    expect(scale.min).toBe(0);
    expect(scale.max).toBe(120);
    expect(scale.ticks).toEqual([0, 30, 60, 90, 120]);
    expect(scale.scale(60)).toEqual(0.5);
    expect(scale.scale(0)).toBe(0);
    expect(scale.scale(120)).toBe(1);
  });
});

describe('linear scale for c(0, 10, 100)', () => {
  const scale = new Linear({
    values: [0, 10, 100],
  });

  it('config', () => {
    expect(scale.min).toEqual(0);
    expect(scale.max).toEqual(100);
  });

  it('translate func', () => {
    expect(scale.translate(10)).toEqual(10);
  });

  it('scale func', () => {
    expect(scale.scale(110)).toEqual(1.1);
    expect(scale.scale(-50)).toEqual(-0.5);
  });

});

describe('linear scale for specified range', () => {
  const scale = new Linear({
    min: 0,
    max: 100,
    range: [0, 1000],
  });
  it('scale func', () => {
    expect(scale.scale(50)).toEqual(500);
    expect(scale.scale(0)).toEqual(0);
    expect(scale.scale(100)).toEqual(1000);
  });
  it('invert func', () => {
    expect(scale.invert(0)).toEqual(0);
    expect(scale.invert(500)).toEqual(50);
    expect(scale.invert(1000)).toEqual(100);
  });
});

describe('linear scale multiple times', () => {
  const scale = new Linear({
    min: 21,
    max: 145,
    nice: true
  });
  
  it('1st time', () => {
    expect(scale.ticks).toEqual([0, 50, 100, 150]);
    expect(scale.nice).toBe(true);
  });

  it('2nd time', () => {
    scale.change({ min: 0 });
    expect(scale.ticks).toEqual([0, 50, 100, 150]);
  });

  it('3th time', () => {
    scale.change({
      min: 21,
      nice: false
    });
    expect(scale.ticks).toEqual([50, 100]);
  });

  it('4th time', () => {
    scale.change({
      min: 21,
      max: 145,
      tickCount: 6
    });
    expect(scale.ticks).toEqual([25, 50, 75, 100, 125]);
  });
});

describe('linear scale for invalid min and max', () => {
  it('min > max', () => {
    const scale = new Linear({
      min: 100,
      max: 0,
      values: [10, 20, 30],
    });
    expect(scale.min).toEqual(10);
    expect(scale.max).toEqual(30);
  });

  it('min = max', () => {
    const scale = new Linear({
      values: [10],
    });
    expect(scale.ticks).toEqual([10]);
  });

  it('all 0', () => {
    const scale = new Linear({
      values: [0],
      nice: true
    });
    expect(scale.ticks).toEqual([0]);
  });
});

// interval, minTickInterval 当前 ticks 的计算方法都不支持
describe.skip('linear scale with Interval', () => {
  it('c(0, 62), minInterval = 14', () => {
    const scale = new Linear({
      min: 0,
      max: 62,
      minTickInterval: 14,
    });
    expect(scale.ticks).toEqual([0, 14, 28, 42, 56, 70]);
  });
});
