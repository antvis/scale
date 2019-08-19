import { expect } from 'chai';
import Time from '../../src/time';
import * as moment from 'moment';

describe('time scale', () => {
  const scale = new Time({
    min: '2011-01-01',
    max: new Date('2011-01-02 00:00:00').getTime(),
    ticks: [ '2011-01-01', '02' ],
  });

  it('config', () => {
    expect(scale.type).to.equal('time');
    expect(scale.min).to.equal(new Date('2011/01/01').getTime());
    expect(scale.max).to.equal(new Date('2011/01/02').getTime());
    expect(scale.tickCount).to.equal(10);
    expect(scale.ticks).to.be.eql([ '2011-01-01', '02' ]);

    const s = new Time({
      values: [ '2011-01-01', '2011-01-02' ],
    });
    expect(s.min).to.equal(new Date('2011/01/01').getTime());
    expect(s.max).to.equal(new Date('2011/01/02').getTime());
  });

  it('scale', () => {
    const text = '2011-01-01 06:00:00';
    const val = scale.scale(text);
    expect(val).to.be.equal(0.25);
    expect(scale.formatter).to.be.undefined;
  });

  it('getText', () => {
    scale.formatter = (val) => moment(val).format('YYYY-MM-DD HH:mm:ss');
    expect(scale.getText('2011-01-02')).to.equal('2011-01-02 00:00:00');
    expect(scale.getText('2011-01-02T00:00:00')).to.equal('2011-01-02 00:00:00');
    expect(scale.getText('2011-01-02T00:00:00.000Z')).to.equal('2011-01-02 08:00:00');
  });

  it('invert', () => {
    const m = scale.invert(0.25);
    expect(m).to.be.a('object');
    expect(m.hour()).to.be.equal(6);
  });
});

describe('ticks', () => {
  const getText = (ticks) => ticks.map((t) => t.text);
  it('c(2000, 2019)', () => {
    const scale = new Time({
      min: '2000-01-01',
      max: '2019-01-01',
    });
    expect(getText(scale.getTicks())).to.be.eql([
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
      tickCount: 6,
    });
    expect(getText(scale.getTicks())).to.be.eql([ '00', '03', '06', '09', '12' ]);
  });

  it('c(00:50, 13:20), showLast', () => {
    const scale = new Time({
      min: '2000-01-01 00:50:00',
      max: '2000-01-01 13:20:00',
      showLast: true,
      tickCount: 3,
    });
    expect(getText(scale.getTicks())).to.be.eql([ '00', '06', '13' ]);
  });

  it('c(00:00:10, 00:00:20)', () => {
    const scale = new Time({
      min: '2000-01-01 00:00:10',
      max: '2000-01-01 00:00:14',
      tickCount: 10,
    });
    expect(getText(scale.getTicks())).to.be.eql([ '00:00:10', '00:00:11', '00:00:12', '00:00:13', '00:00:14' ]);
  });

  it('c(10:00, 13:00), format is hh', () => {
    const scale = new Time({
      min: '2000-01-01 10:00:10',
      max: '2000-01-01 13:00:14',
      tickCount: 4,
      formatter: (v) => moment(v).format('hh'),
    });
    expect(getText(scale.getTicks())).to.be.eql([ '10', '11', '12', '01' ]);
  });
});
