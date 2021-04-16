import { pretty } from '../../../src/tick-methods/pretty';

describe('pretty ticks', () => {
  it('pretty for c(0, 0)', () => {
    const res = pretty(0, 0);
    expect(res).toEqual([0]);
  });

  it('pretty for c(0, 10)', () => {
    const res = pretty(0, 10);
    expect(res).toEqual([0, 2, 4, 6, 8, 10]);
  });

  it('pretty for c(1, 9.5)', () => {
    const res = pretty(1, 9.5);
    expect(res).toEqual([0, 2, 4, 6, 8, 10]);
  });

  it('pretty for c(1, 11)', () => {
    const res = pretty(1, 11);
    expect(res).toEqual([0, 2, 4, 6, 8, 10, 12]);
  });

  it('pretty for c(3, 97)', () => {
    const res = pretty(3, 97);
    expect(res).toEqual([0, 20, 40, 60, 80, 100]);
  });

  it('pretty for c(-100, -10)', () => {
    const res = pretty(-100, -10);
    expect(res).toEqual([-100, -80, -60, -40, -20, 0]);
  });

  it('pretty for c(0, 4200)', () => {
    const res = pretty(0, 4200);
    // g2 3.0 = [ 0, 1200, 2400, 3600, 4800 ]
    expect(res).toEqual([0, 1000, 2000, 3000, 4000, 5000]);
  });

  it('pretty for c(0.0002, 0.001)', () => {
    const res = pretty(0.0002, 0.001);
    expect(res).toEqual([0.0002, 0.0004, 0.0006, 0.0008, 0.001]);
  });

  it('pretty for c(-5, 605)', () => {
    const res = pretty(-5, 605, 5);
    expect(res).toEqual([-100, 0, 100, 200, 300, 400, 500, 600, 700]);
  });

  it('pretty for c(0, 0.0000267519)', () => {
    const res = pretty(0, 0.0000267519);
    expect(res).toEqual([0, 0.000005, 0.00001, 0.000015, 0.00002, 0.000025, 0.00003]);
  });

  it('pretty for c(0.0000237464, 0.0000586372)', () => {
    const res = pretty(0.0000237464, 0.0000586372);
    expect(res).toEqual([0.00002, 0.000025, 0.00003, 0.000035, 0.00004, 0.000045, 0.00005, 0.000055, 0.00006]);
  });

  it('pretty for c(0.243, 0.584, 0.987, 0.153, 0.433)', () => {
    const scale1 = pretty(0.153, 0.987);
    // d3 version == [0.2, 0.4, 0.6000000000000001, 0.8, 1]
    expect(scale1).toEqual([0, 0.2, 0.4, 0.6, 0.8, 1]);
    const scale2 = pretty(0.153, 0.987, 10);
    // same as d3
    expect(scale2).toEqual([0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]);
  });
});
