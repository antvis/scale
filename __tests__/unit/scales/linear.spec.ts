import { Linear } from '../../../src/scales/linear';

describe('Linear Scale Test', () => {
  test('test', () => {
    console.log('TODO test');
  });

  test('test map fn', () => {
    const scale = new Linear({
      domain: [0, 100],
      range: [500, 1000],
    });

    expect(scale.map(0)).toStrictEqual(500);
    expect(scale.map(50)).toStrictEqual(750);
    expect(scale.map(100)).toStrictEqual(1000);
    expect(scale.map(250)).toStrictEqual(1750);
  });

  test('test invert fn', () => {
    const scale = new Linear({
      domain: [0, 100],
      range: [500, 1000],
    });
    // 500 / 100 = 5
    expect(scale.invert(500)).toStrictEqual(0);
    expect(scale.invert(750)).toStrictEqual(50);
    expect(scale.invert(1000)).toStrictEqual(100);
    expect(scale.invert(1750)).toStrictEqual(250);
  });

  test('test unknown data', () => {
    const scale = new Linear({
      domain: [0, 100],
      range: [500, 1000],
    });

    expect(scale.map(Number.NaN)).toStrictEqual(undefined);

    scale.update({
      unknown: 'hello world',
    });
    expect(scale.map(Number.NaN)).toStrictEqual('hello world');
  });

  test('test nice options', () => {
    const scale = new Linear({
      domain: [0, 100],
      range: [500, 1000],
    });

    expect(scale.map(20.5)).toStrictEqual(602.5);

    scale.update({
      round: true,
    });

    expect(scale.map(20.5)).toStrictEqual(603);
  });
});
