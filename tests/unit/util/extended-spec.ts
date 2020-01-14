import extended from '../../../src/util/extended';

describe('extended ticks', function() {
  it('extended for c(0, 10)', () => {
    const res = extended(0, 10);
    expect(res.ticks).toEqual([ 0, 2.5, 5, 7.5, 10 ]);
  });

  it('extended for c(1, 9.5)', () => {
    const res = extended(1, 9.5);
    expect(res.ticks).toEqual([ 0, 2.5, 5, 7.5, 10 ]);
  });

  it('extended for c(1, 11)', () => {
    const res = extended(1, 11);
    expect(res.ticks).toEqual([ 0, 3, 6, 9, 12 ]);
  });

  it('extended for c(3, 97)', () => {
    const res = extended(3, 97);
    expect(res.ticks).toEqual([ 0, 25, 50, 75, 100 ]);
  });

  it('extended for c(-100, -10)', () => {
    const res = extended(-100, -10);
    expect(res.ticks).toEqual([ -100, -75, -50, -25, 0 ]);
  });

  it('extended for c(0, 4200)', () => {
    const res = extended(0, 4200);
    // g2 3.0 = [ 0, 1200, 2400, 3600, 4800 ]
    expect(res.ticks).toEqual([ 0, 1000, 2000, 3000, 4000, 5000 ]);
  });

  it('extended for c(0.0002, 0.001)', () => {
    const res = extended(0.0002, 0.001);
    expect(res.ticks).toEqual([ 0.0002, 0.0004, 0.0006, 0.0008, 0.001 ]);
  });

  it('extended for c(0, 0.0000267519)', () => {
    const res = extended(0, 0.0000267519);
    expect(res.ticks).toEqual([ 0, 0.00001, 0.00002, 0.00003 ]);
  });

  it('extended for c(0.0000237464, 0.0000586372)', () => {
    const res = extended(0.0000237464, 0.0000586372);
    expect(res.ticks).toEqual([ 0.00002, 0.00003, 0.00004, 0.00005, 0.00006 ]);
  });

  it('extended for c(0.243, 0.584, 0.987, 0.153, 0.433)', () => {
    const scale1 = extended(0.153, 0.987);
    // d3 version == [0.2, 0.4, 0.6000000000000001, 0.8, 1]
    expect(scale1.ticks).toEqual([ 0, 0.3, 0.5, 0.8, 1 ]);
    const scale2 = extended(0.153, 0.987, 10);
    // same as d3
    expect(scale2.ticks).toEqual([ 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1 ]);
  });

  it('extended for -5 605', () => {
    const scale1 = extended(-5, 605);
    expect(scale1.ticks).toEqual([ -100, 100, 300, 500, 700 ]);
    const scale2 = extended(-5, 605, 6, false);
    expect(scale2.ticks).toEqual([ 0, 100, 200, 300, 400, 500, 600  ]);
  });
});
