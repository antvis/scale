import Scale from '../../src/category/time';
import '../../src/tick-method/index';
import {toTimeStamp} from '../../src/util/time';

describe('test time category scale', () => {
  it('init', () => {
    const scale = new Scale({
      values: ['2010-01-01', '2012-02-02']
    });
    expect(scale.min).toBe(0);
    expect(scale.max).toBe(1);
  });

  it('scale', () => {
    const scale = new Scale({
      values: ['2010-01-01', '2012-02-02', '2012-02-04']
    });
    expect(scale.scale('2010-01-05')).toBe(NaN);
    expect(scale.scale('2010-01-03')).toBe(NaN);
    expect(scale.scale('2010-01-01')).toBe(0);
    expect(scale.scale('2012-02-04')).toBe(1);
    expect(scale.scale(toTimeStamp('2010-01-01'))).toBe(0);
    expect(scale.scale(toTimeStamp('2010-01-03'))).toBe(NaN);

    expect(scale.scale(0)).toBe(0);
    expect(scale.scale(1)).toBe(0.5);
    expect(scale.invert(0)).toBe(toTimeStamp('2010-01-01'));
    expect(scale.getText('2010-01-01 00:00:00')).toBe('2010-01-01');

    expect(scale.getTicks().length).toBe(3);
  });
  it('min, max', () => {
    const scale = new Scale({
      values: ['2010-01-01', '2012-02-02', '2012-02-04'],
      min: 1
    });
    expect(scale.scale('2010-01-01')).toBe(NaN);
    expect(scale.scale('2012-02-02')).toBe(0);
    expect(scale.scale('2012-02-04')).toBe(1);
    expect(scale.invert(1)).toBe(toTimeStamp('2012-02-04'));
    expect(scale.invert(-1)).toBe(NaN);
    expect(scale.getTicks().length).toBe(2);
  });
  it('has ticks', () => {
    const scale = new Scale({
      values: ['2010-01-01', '2012-02-02', '2012-02-04'],
      ticks: ['2010-01-01', '2012-02-04'],
    });
    expect(scale.getTicks().length).toEqual(2);
  });
  it('has ticks, not in values', () => {
    const scale = new Scale({
      values: ['2010-01-01', '2012-02-02', '2012-02-04'],
      ticks: ['2010-01-10', '2012-02-04'],
    });
    expect(scale.getTicks().length).toEqual(2);
  });
  it('tickCount > values length', () => {
    const scale = new Scale({
      values: ['2010-01-01', '2012-02-02', '2012-02-04'],
      tickCount: 10
    });
    expect(scale.ticks.length).toBe(3);
  });
  it('tickCount < values length', () => {
    const scale = new Scale({
      values: ['2010-01-01','2010-01-02', '2010-01-03', '2012-02-02','2012-02-03', '2012-02-04','2012-02-04'],
      tickCount: 4
    });
    expect(scale.ticks.length).toBe(4);
  });

  it('tickCount < values length', () => {
    const scale = new Scale({
      values: ['2010-01-01','2010-01-02', '2010-01-03', '2012-02-02','2012-02-03', '2012-02-04','2012-02-04'],
      tickCount: 4,
      mask: 'YY-MM-DD',
      min: 5
    });
    expect(scale.ticks.length).toBe(2);
    expect(scale.getText('2010-01-01')).toBe('10-01-01');
    expect(scale.getText(toTimeStamp('2010-01-01'))).toBe('10-01-01');
  });
});