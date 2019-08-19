import { expect } from 'chai';
import Identity from '../../src/identity';

describe('base scale', () => {
  const scale = new Identity({});

  it('getText func', () => {
    expect(scale.getText(10)).to.equal('10');
    expect(scale.getText()).to.equal('');
    expect(scale.getText(Object.create(null))).to.equal('');
  });

  it('calcPercent', () => {
    expect(scale._calcPercent('5', 0, 10)).to.be.NaN;
  });
});

describe('identity scale', function() {
  const scale = new Identity({
    values: [ 0, 0.5, 1 ],
    ticks: [ 0, 0.25, 0.75, { tickValue: 1 } ],
    formatter: (v) => `(${v})`,
  });

  it('type', function() {
    expect(scale.type).to.be.equal('identity');
    expect(scale.isIdentity).to.true;
    expect(scale.values).to.eql([ 0, 0.5, 1 ]);
  });

  it('scale func', function() {
    expect(scale.scale('test')).to.equal(0);
    expect(scale.scale(0.5)).to.equal(0.5);
  });

  it('invert func', function() {
    expect(scale.invert(1)).to.be.equal(1);
    expect(scale.invert(0)).to.be.equal(0);
  });

  it('getText func', function() {
    expect(scale.getText(0.5)).to.be.equal('(0.5)');
  });

  it('getTicks func', function() {
    expect(scale.ticks.length).to.equal(4);
    expect(scale.getTicks()[1]).eqls({ text: '(0.25)', tickValue: 0.25, value: 0.25 });
    expect(scale.getTicks()[3]).eqls({ tickValue: 1 });
  });

  it('change func', function() {
    const scale = new Identity({
      ticks: [ 1, 2, 3, 4, 5 ],
    });
    expect(scale.getTicks().length).to.be.equal(5);
    scale.change({
      ticks: [ 1, 2 ],
    });
    expect(scale.getTicks().length).to.be.equal(2);
  });

  it('clone func', function() {
    const scale = new Identity({
      ticks: [ 1, 2, 3, 4, 5 ],
    });
    const newScale = scale.clone();
    expect(newScale.ticks).eqls([ 1, 2, 3, 4, 5 ]);
  });
});

describe('scale for undefined', () => {
  const scale = new Identity({
    values: [],
    range: [ 0.1, 0.9 ],
  });

  it('scale undefined', () => {
    expect(scale.scale(undefined)).to.eql(0.1);
  });

  it('change range', () => {
    scale.range = [ 0.5, 1 ];
    expect(scale.scale(undefined)).to.eql(0.5);
  });

  it('set unknow', () => {
    scale.change({ unknown: null });
    expect(scale.scale(undefined)).to.be.null;
  });
});
