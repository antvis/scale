import { Linear } from '../../../src';

describe('Linear Scale with Breaks', () => {
  test('single break: values before, inside, and after break', () => {
    const scale = new Linear({
      domain: [0, 200],
      breaks: [{ start: 40, end: 100, gap: 0.1 }],
    });

    const { domain, range, round, tickCount, nice, clamp, unknown, tickMethod } = scale.getOptions() as Record<
      string,
      any
    >;
    expect(domain).toStrictEqual([0, 40, 100, 150, 200]);
    expect(range).toStrictEqual([1, 0.7000000000000001, 0.6, 0.25, 0]);
    expect(round).toBeFalsy();
    expect(tickCount).toStrictEqual(5);
    expect(nice).toBeFalsy();
    expect(clamp).toBeFalsy();
    expect(unknown).toBeUndefined();
    expect(tickMethod(0, 200, 5)).toEqual(domain);
  });

  test('multiple breaks should compress multiple regions', () => {
    const scale = new Linear({
      domain: [0, 200],
      breaks: [
        { start: 40, end: 100, gap: 0.1 },
        { start: 120, end: 160, gap: 0.1 },
      ],
    });

    const { domain, range } = scale.getOptions();
    expect(domain).toStrictEqual([0, 40, 100, 120, 160, 200]);
    expect(range).toStrictEqual([1, 0.7000000000000001, 0.6, 0.35, 0.25, 0]);
  });

  test('multiple breaks should compress multiple regions with out of order', () => {
    const scale = new Linear({
      domain: [0, 200],
      breaks: [
        { start: 120, end: 160, gap: 0.1 },
        { start: 40, end: 100, gap: 0.1 },
      ],
    });

    const { domain, range } = scale.getOptions();
    expect(domain).toStrictEqual([0, 40, 100, 120, 160, 200]);
    expect(range).toStrictEqual([1, 0.7000000000000001, 0.6, 0.35, 0.25, 0]);
  });

  test('multiple breaks should compress multiple regions with reverse', () => {
    const scale = new Linear({
      domain: [0, 980],
      range: [0, 1],
      breaks: [
        { start: 300, end: 500, gap: 0.1 },
        { start: 600, end: 800, gap: 0.05 },
      ],
    });

    const { domain, range } = scale.getOptions();
    expect(domain).toStrictEqual([0, 200, 300, 500, 600, 800, 980]);
    expect(range).toStrictEqual([
      0, 0.20408163265306123, 0.35816326530612247, 0.45816326530612245, 0.6892857142857143, 0.7392857142857143, 1,
    ]);
  });

  test('single break: update', () => {
    const scale = new Linear({
      domain: [0, 200],
      breaks: [{ start: 40, end: 100, gap: 0.1 }],
    });

    const { domain, range } = scale.getOptions();
    expect(domain).toStrictEqual([0, 40, 100, 150, 200]);
    expect(range).toStrictEqual([1, 0.7000000000000001, 0.6, 0.25, 0]);
    scale.update({
      domain: [0, 200],
      breaks: [],
    });
    const scaleOptions = scale.getOptions();
    expect(scaleOptions.domain).toStrictEqual([0, 50, 100, 150, 200]);
    expect(scaleOptions.range).toStrictEqual([1, 0.75, 0.5, 0.25, 0]);
    scale.update({
      domain: [0, 200],
      breaks: undefined,
    });
    const scaleOptions2 = scale.getOptions();
    expect(scaleOptions2.domain).toStrictEqual([0, 200]);
  });

  test('no breaks should behave like normal linear scale', () => {
    const scale = new Linear({
      domain: [0, 200],
    });

    const { domain, range } = scale.getOptions();
    expect(domain).toStrictEqual([0, 200]);
    expect(range).toStrictEqual([0, 1]);
  });

  test('linear scale with clone', () => {
    const scale = new Linear({
      domain: [0, 200],
    });

    const scale2 = scale.clone();
    expect(scale2).toBeInstanceOf(Linear);
    expect(scale2.getOptions()).toEqual(scale.getOptions());
  });
});
