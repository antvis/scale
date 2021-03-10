import { strictLimit } from '../../../src/util/strict-limit';

function roundEpsilon(x) {
  return Math.round(x * 1e12) / 1e12;
}

describe('strict min/max limit', () => {
  it('strict min/max limit', () => {
    expect(
      strictLimit({
        minLimit: 0,
        maxLimit: 1,
        tickCount: 6,
      }).map(roundEpsilon)
    ).toEqual([0, 0.2, 0.4, 0.6, 0.8, 1]);

    expect(
      strictLimit({
        minLimit: 0.1,
        maxLimit: 1,
        tickCount: 6,
      }).map(roundEpsilon)
    ).toEqual([0.1, 0.28, 0.46, 0.64, 0.82, 1]);
  });

  expect(
    strictLimit({
      minLimit: 0,
      maxLimit: 0.9,
      tickCount: 6,
    }).map(roundEpsilon)
  ).toEqual([0, 0.18, 0.36, 0.54, 0.72, 0.9]);

  expect(
    strictLimit({
      minLimit: 0.2,
      maxLimit: 0.8,
      tickCount: 6,
    }).map(roundEpsilon)
  ).toEqual([0.2, 0.32, 0.44, 0.56, 0.68, 0.8]);

  expect(
    strictLimit({
      minLimit: 0,
      maxLimit: 100,
      tickCount: 6,
    })
  ).toEqual([0, 20, 40, 60, 80, 100]);

  expect(
    strictLimit({
      minLimit: 10,
      maxLimit: 100,
      tickCount: 6,
    })
  ).toEqual([10, 10 + 18, 10 + 18 * 2, 10 + 18 * 3, 10 + 18 * 4, 100]);

  expect(
    strictLimit({
      minLimit: 0,
      maxLimit: 90,
      tickCount: 6,
    })
  ).toEqual([0, 0 + 18, 0 + 18 * 2, 0 + 18 * 3, 0 + 18 * 4, 90]);

  expect(
    strictLimit({
      minLimit: 20,
      maxLimit: 80,
      tickCount: 6,
    })
  ).toEqual([20, 0 + 32, 20 + 12 * 2, 20 + 12 * 3, 20 + 12 * 4, 80]);

  expect(
    strictLimit({
      minLimit: 0,
      maxLimit: 100,
    })
  ).toEqual([0, 25, 50, 75, 100]);

  expect(
    strictLimit({
      minLimit: 100,
      maxLimit: 0,
    })
  ).toEqual([0, 25, 50, 75, 100]);
});
