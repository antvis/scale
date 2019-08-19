import { expect } from 'chai';
import Category from '../../src/category';

describe('category scale', function() {
  const scale = new Category({
    values: [ '一月', '二月', 3, '四月', 5 ],
  });

  it('config', function() {
    expect(scale.type).to.equal('cat');
    expect(scale.isCategory).to.be.true;
    expect(scale.values).to.eql([ '一月', '二月', 3, '四月', 5 ]);
    expect(scale.type).to.equal('cat');
    expect(scale.min).to.equal(0);
    expect(scale.max).to.equal(4);
  });

  it('translate func', function() {
    expect(scale.translate('二月')).to.equal(1);
    expect(scale.translate(1)).to.equal(1);
    expect(scale.translate(3)).to.equal(2);
    expect(scale.translate('六月')).to.be.NaN;
  });

  it('scale func', function() {
    expect(scale.scale('二月')).to.be.equal(0.25);
    expect(scale.scale(1)).to.equal(0.25);
    expect(scale.scale(3)).to.equal(0.5);
    expect(scale.scale(2.5)).to.equal(0.625);
    expect(scale.scale('六月')).to.be.NaN;
  });

  it('getText func', function() {
    expect(scale.getText('二月')).to.be.equal('二月');
    scale.formatter = (text) => `${text}_1`;
    expect(scale.getText('二月')).to.be.equal('二月_1');
    expect(scale.getText(1)).to.be.equal('二月_1');
  });

  it('invert func', function() {
    expect(scale.invert(0)).to.be.equal('一月');
    expect(scale.invert(0.5)).to.be.equal(3);
    expect(scale.invert(1)).to.be.equal(5);
    expect(scale.invert(0.51)).to.be.equal(3);
    expect(scale.invert('二月')).to.be.equal('二月');
    expect(scale.invert(-1)).to.be.equal(undefined);
  });

  it('getTicks func', function() {
    const ticks = scale.getTicks();
    expect(ticks.length).to.be.equal(scale.values.length);

    expect(ticks[0].value).to.be.equal(0);
    expect(ticks[ticks.length - 1].value).to.be.equal(1);
  });

  it('clone func', function() {
    const n1 = scale.clone();
    expect(n1.scale('一月')).to.be.equal(0);
    expect(n1.scale(3)).to.be.equal(0.5);
    expect(n1.scale(5)).to.be.equal(1);

    expect(scale.invert(0)).to.be.equal('一月');
    expect(scale.invert(0.5)).to.be.equal(3);
    expect(scale.invert(1)).to.be.equal(5);

    expect(n1.type).to.be.equal('cat');
  });

  it('change func', function() {
    scale.change({
      values: [ '一', '二', '三', '四', '五', '六' ],
    });
    expect(scale.invert(0)).to.be.equal('一');
    expect(scale.invert(0.4)).to.be.equal('三');
    expect(scale.invert(1)).to.be.equal('六');
    expect(scale.getTicks().length).to.be.equal(6);
  });
});

describe('category scale with specified range', function() {
  const scale = new Category({
    values: [ '一月', '二月', '三月', '四月', '五月' ],
    range: [ 0.1, 0.9 ],
  });

  it('config', function() {
    expect(scale.range).not.to.be.equal(null);
    expect(scale.range[0]).to.be.equal(0.1);
    expect(scale.range[1]).to.be.equal(0.9);
  });

  it('scale func', function() {
    const val = scale.scale('二月');
    // 精度问题，计算结果是0.30000000000000004
    expect(parseFloat(val.toFixed(1))).to.be.equal(0.3);
    expect(scale.scale('一月')).to.be.equal(0.1);
    expect(scale.scale('五月')).to.be.equal(0.9);
  });

  it('invert func', function() {
    expect(scale.invert(0.1)).to.be.equal('一月');
    expect(scale.invert(0.5)).to.be.equal('三月');
    expect(scale.invert(0.6)).to.be.equal('四月');
    expect(scale.invert(0.9)).to.be.equal('五月');
  });
});

// 不再支持
describe.skip('category scale for numbers', function() {
  const scale = new Category({
    values: [ 0, 9, 5, 4, 3 ],
  });

  it('config', function() {
    expect(scale.isAllNumber).to.be.true;
    expect(scale.min).to.equal(0);
    expect(scale.max).to.equal(9);
    expect(scale.ticks).to.eqls([ 0, 3, 4, 5, 9 ]);
  });

  it('translate func', function() {
    expect(scale.translate(4.5)).to.equal(4.5);
    expect(scale.translate('4.5')).to.be.NaN;
  });

  it('scale func', function() {
    expect(scale.scale(4.5)).to.equal(0.5);
    expect(scale.scale(9)).to.equal(1);
    expect(scale.scale(3)).to.equal(1 / 3);
  });
});

describe('category scale multiple times', () => {
  const scale = new Category({
    values: [ 'A', 'B', 'C' ],
  });

  it('1st time', () => {
    expect(scale.scale('A')).to.be.equal(0);
  });

  it('2nd time', () => {
    scale.range = [ 0.15, 0.85 ];
    expect(scale.scale('A')).to.be.equal(0.15);
  });
});

describe('category scale with tickInterval', () => {
  it('normal', () => {
    const scale = new Category({
      values: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G' ],
      tickInterval: 1,
    });
    expect(scale.ticks).to.eql([ 'A', 'C', 'E', 'G' ]);
    scale.change({
      tickInterval: 2,
    });
    expect(scale.ticks).to.eql([ 'A', 'D', 'G' ]);
  });

  it.skip('number category', () => {
    const scale = new Category({
      values: [ 0, 9, 5, 4, 3 ],
      tickInterval: 1,
    });
    expect(scale.ticks).to.eql([ 0, 4, 9 ]);
  });
});

describe('category scale for 0~1 value', () => {
  it('0 value', () => {
    const scale = new Category({ values: []});
    expect(scale.min).to.equal(0);
    expect(scale.max).to.equal(0);
  });

  it('1 value', () => {
    const scale = new Category({ values: [ 'A' ]});
    expect(scale.min).to.equal(0);
    expect(scale.max).to.equal(1);
    expect(scale.scale('A')).to.equal(0);
  });
});

describe('category scale with tickCount', () => {
  it('tickCount = 5', () => {
    const scale = new Category({
      values: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G' ],
      tickCount: 4,
    });
    expect(scale.ticks).to.eql([ 'A', 'C', 'E', 'G' ]);
  });
});
