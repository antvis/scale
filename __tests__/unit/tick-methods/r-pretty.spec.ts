import { rPretty } from '../../../src';

describe('rPretty ticks', () => {
  it('rPretty for c(0, 0)', () => {
    const res = rPretty(0, 0);
    expect(res).toEqual([0]);
  });

  it('rPretty for c(0, 10)', () => {
    const res = rPretty(0, 10);
    expect(res).toEqual([0, 2, 4, 6, 8, 10]);
  });

  it('rPretty for c(1, 9.5)', () => {
    const res = rPretty(1, 9.5);
    expect(res).toEqual([0, 2, 4, 6, 8, 10]);
  });

  it('rPretty for c(1, 11)', () => {
    const res = rPretty(1, 11);
    expect(res).toEqual([0, 2, 4, 6, 8, 10, 12]);
  });

  it('rPretty for c(3, 97)', () => {
    const res = rPretty(3, 97);
    expect(res).toEqual([0, 20, 40, 60, 80, 100]);
  });

  it('rPretty for c(-100, -10)', () => {
    const res = rPretty(-100, -10);
    expect(res).toEqual([-100, -80, -60, -40, -20, 0]);
  });

  it('rPretty for c(0, 4200)', () => {
    const res = rPretty(0, 4200);
    // g2 3.0 = [ 0, 1200, 2400, 3600, 4800 ]
    expect(res).toEqual([0, 1000, 2000, 3000, 4000, 5000]);
  });

  it('rPretty for c(0.0002, 0.001)', () => {
    const res = rPretty(0.0002, 0.001);
    expect(res).toEqual([0.0002, 0.0004, 0.0006, 0.0008, 0.001, 0.0012]);
  });

  it('rPretty for c(-5, 605)', () => {
    const res = rPretty(-5, 605, 5);
    expect(res).toEqual([-100, 0, 100, 200, 300, 400, 500, 600, 700]);
  });

  it('rPretty for c(0, 0.0000267519)', () => {
    const res = rPretty(0, 0.0000267519);
    expect(res).toEqual([0, 0.000005, 0.00001, 0.000015, 0.00002, 0.000025, 0.00003]);
  });

  it('rPretty for c(0.0000237464, 0.0000586372)', () => {
    const res = rPretty(0.0000237464, 0.0000586372);
    expect(res).toEqual([0.00002, 0.000025, 0.00003, 0.000035, 0.00004, 0.000045, 0.00005, 0.000055, 0.00006]);
  });

  it('rPretty for c(0.243, 0.584, 0.987, 0.153, 0.433)', () => {
    const scale1 = rPretty(0.153, 0.987);
    // d3 version == [0.2, 0.4, 0.6000000000000001, 0.8, 1]
    expect(scale1).toEqual([0, 0.2, 0.4, 0.6, 0.8, 1]);
    const scale2 = rPretty(0.153, 0.987, 10);
    // same as d3
    expect(scale2).toEqual([0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]);
  });

  it('rPretty for tiny number', () => {
    expect(rPretty(9.89999999999999, 9.9)).toStrictEqual([
      9.89999999999999, 9.89999999999999, 9.89999999999999, 9.89999999999999, 9.9, 9.9, 9.9,
    ]);
  });

  it('handle decimal tickCount', () => {
    expect(rPretty(0, 5, 0.4)).toStrictEqual(rPretty(0, 5, 0));
    expect(rPretty(0, 5, 0.5)).toStrictEqual(rPretty(0, 5, 1));
  });

  it('handle negative tickCount', () => {
    expect(rPretty(0, 5, -1)).toStrictEqual(rPretty(0, 5, 0));
    expect(rPretty(0, 5, -1.2)).toStrictEqual(rPretty(0, 5, 0));
  });

  it('handle negative tickValue', () => {
    expect(rPretty(-0.4, 0)).toStrictEqual([-0.4, -0.3, -0.2, -0.1, 0]);
  });
});
