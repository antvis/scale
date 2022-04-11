import Time from '../../src/continuous/time';
import '../../src/tick-method/index';
import { timeFormat, toTimeStamp } from '../../src/util/time';

describe('time scale', () => {
  const scale = new Time({
    min: '2011-01-01',
    max: new Date('2011-01-02 00:00:00').getTime(),
    ticks: ['2011-01-01', '02'],
  });

  it('config', () => {
    expect(scale.type).toEqual('time');
    expect(scale.min).toEqual(new Date('2011/01/01').getTime());
    expect(scale.max).toEqual(new Date('2011/01/02').getTime());
    expect(scale.tickCount).toEqual(7);
    expect(scale.ticks).toEqual(['2011-01-01', '02']);
    expect(scale.getText('2010-01-01')).toBe('2010-01-01');
    expect(scale.getText(new Date('2010-01-01'))).toBe('2010-01-01');
    expect(scale.getText(new Date('2010/01/01'))).toBe('2010-01-01');
  });
  it('only values', () => {
    const s = new Time({
      values: ['2011-01-01', '2011-01-02'],
    });
    expect(s.min).toEqual(new Date('2011/01/01').getTime());
    expect(s.max).toEqual(new Date('2011/01/02').getTime());
    s.change({
      values: ['2011-01-02', '2011-01-10']
    });
    expect(s.min).toEqual(new Date('2011/01/02').getTime());
    expect(s.max).toEqual(new Date('2011/01/10').getTime());
  });

  it('scale', () => {
    const text = '2011-01-01 06:00:00';
    const val = scale.scale(text);
    expect(val).toEqual(0.25);
    expect(scale.formatter).toBe(undefined);
  });

  it('getText', () => {
    expect(scale.getText('2011-01-02 00:00:00')).toEqual('2011-01-02');
    expect(scale.getText('2011-01-02T00:00:00')).toEqual('2011-01-02');
  });

  it('invert', () => {
    const m = scale.invert(0.25);
    expect(m).toBe(toTimeStamp('2011-01-01 06:00:00'));
  });
  it('change', () => {
    scale.change({
      min: '2010-01-01'
    });
    expect(scale.min).toBe(toTimeStamp('2010/01/01'));
    expect(scale.ticks).toEqual(['2011-01-01', '02']);
  });
});

describe('ticks', () => {
  const getText = (ticks) => ticks.map((t) => t.text);
  it('c(2000, 2019)', () => {
    const scale = new Time({
      min: '2000-01-01',
      max: '2019-01-02',
      mask: 'YYYY',
      tickCount: 11,
    });
    expect(getText(scale.getTicks())).toEqual([
      '2000',
      '2002',
      '2004',
      '2006',
      '2008',
      '2010',
      '2012',
      '2014',
      '2016',
      '2018',
    ]);
  });

  it('c(00:00, 12:00)', () => {
    const scale = new Time({
      min: '2000-01-01 00:00:00',
      max: '2000-01-01 12:00:00',
      mask: 'HH',
      tickCount: 6,
    });
    expect(getText(scale.getTicks())).toEqual(['00', '02', '04', '06', '08','10', '12']);
  });

  it('c(00:50, 13:20), showLast', () => {
    const scale = new Time({
      min: '2000-01-01 00:50:00',
      max: '2000-01-01 13:20:00',
      mask: 'HH',
      nice: true,
      tickCount: 3,
    });
    expect(getText(scale.getTicks())).toEqual(['00', '05', '10', '15']);
  });

  it('c(00:00:10, 00:00:20)', () => {
    const scale = new Time({
      min: '2000-01-01 00:00:10',
      max: '2000-01-01 00:00:14',
      mask: 'HH:mm:ss',
      tickCount: 10,
    });
    expect(getText(scale.getTicks())).toEqual(['00:00:10', '00:00:11', '00:00:12', '00:00:13', '00:00:14']);
  });

  it('c(10:00, 13:00), format is hh', () => {
    const scale = new Time({
      min: '2000-01-01 10:00:10',
      max: '2000-01-01 14:00:14',
      tickCount: 4,
      nice: true,
      mask: 'hh'
    });
    expect(getText(scale.getTicks())).toEqual(['10', '12', '02', '04']);
  });

  it('time ticks limit warning', () => {
    const warn = console.warn;
    console.warn = jest.fn();

    let scale = new Time({
      min: '2000-01-01 10:00:10',
      max: '2000-01-01 14:00:14',
      tickInterval: 1,
    });

    expect(console.warn).toHaveBeenCalledWith(`Notice: current ticks length(3602) >= 512, may cause performance issues, even out of memory. Because of the configure "tickInterval"(in milliseconds, current is ${Math.floor((new Date('2000-01-01 14:00:14').getTime() - new Date('2000-01-01 10:00:10').getTime()) / (2 ** 12 - 1))}) is too small, increase the value to solve the problem!`);

    console.warn = jest.fn();

    scale = new Time({
      min: '2000-01-01 10:00:10',
      max: '2000-01-01 14:00:14',
      tickCount: 1000,
    });

    expect(console.warn).toHaveBeenCalledWith('Notice: current ticks length(962) >= 512, may cause performance issues, even out of memory. Because of the configure "tickInterval"(in milliseconds, current is 14404) is too small, increase the value to solve the problem!');

    // 复原
    console.warn = warn;
  });

  it('ticks is too large', () => {
    const scale = new Time({
      min: '2010-01',
      max: '2017-02',
      tickInterval: 1,
    });

    expect(scale.getTicks().length).toBeLessThan(2 ** 12);
  });
});
