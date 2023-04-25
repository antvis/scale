import { createScale as fn } from '../../../src/utils/create-scale';

describe('test createScale fn', () => {
  it('test create Band', () => {
    const scale = fn('Band', {
      domain: ['A', 'B', 'C'],
      range: [0, 500],
      paddingOuter: 0.2,
    });
    expect(scale.map('A')).toBeCloseTo(29.41, 2);
    expect(scale.map('B')).toBeCloseTo(176.47, 2);
    expect(scale.map('C')).toBeCloseTo(323.53, 2);
  });

  it('test create Linear', () => {
    const scale = fn('Linear', {
      range: [0, 100],
      domain: [0, 10],
    });
    expect(scale.map(0)).toBe(0);
    expect(scale.map(5)).toBe(50);
    expect(scale.map(10)).toBe(100);
  });

  it('test create Ordinal', () => {
    const scale = fn('Ordinal', {
      domain: [new Date('2020-02-01'), new Date('2020-02-02'), new Date('2020-02-03')],
      range: ['a', 'b', 'c'],
    });
    expect(scale.map(new Date('2020-02-02'))).toStrictEqual('b');
    expect(scale.map(new Date('2020-02-03'))).toStrictEqual('c');
    expect(scale.map(new Date('2020-02-01'))).toStrictEqual('a');
  });
});
