import { Identity } from '../../src';

describe('base scale', () => {
  const scale = new Identity({});

  it('getText func', () => {
    expect(scale.getText(10)).toEqual('10');
    expect(scale.getText('')).toEqual('');
  });
});

describe('identity scale', function() {
  const scale = new Identity({
    values: [10],
    formatter: (v) => `(${v})`,
  });

  it('type', function() {
    expect(scale.type).toEqual('identity');
    expect(scale.isIdentity).toBeTruthy();
    expect(scale.values).toEqual([10]);
  });

  it('scale func', function() {
    expect(scale.scale('test')).toEqual(0);
    expect(scale.scale(0.5)).toEqual(0.5);
  });

  it('invert func', function() {
    expect(scale.invert(1)).toEqual(10);
    expect(scale.invert(0)).toEqual(10);
  });

  it('getText func', function() {
    expect(scale.getText(0.5)).toEqual('(0.5)');
  });

  it('getTicks func', function() {
    expect(scale.ticks.length).toEqual(1);
    expect(scale.getTicks()[0]).toEqual({ text: '(10)', tickValue: 10, value: 0 });
  });

  it('change func', function() {
    const scale1 = new Identity({
      values: [6]
    });
    expect(scale1.getTicks().length).toEqual(1);
    scale1.change({
      values: [10]
    });
    expect(scale1.ticks[0]).toEqual(10);
  });

  it('clone func', function() {
    const scale1 = new Identity({
      values: ['a']
    });
    const newScale = scale1.clone();
    expect(newScale.ticks).toEqual([ 'a' ]);
  });
});

describe('scale for undefined', () => {
  const scale = new Identity({
    values: [],
    range: [ 0.1, 0.9 ],
  });

  it('scale undefined', () => {
    expect(scale.scale(undefined)).toBe(0.1);
  });

  it('invert', () => {
    expect(scale.invert(-1)).toBeNaN();
  });

  it('change range', () => {
    scale.range = [ 0.5, 1 ];
    expect(scale.scale(undefined)).toBe(0.5);
  });
});
