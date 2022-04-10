import { getTickMethod } from '../../../src/tick-method/index';

describe('tick-method', () => {
  it('getTickMethod(...) should return a tick method', () => {
    expect(getTickMethod('cat')).toBeDefined();
    expect(getTickMethod('time-cat')).toBeDefined();
    expect(getTickMethod('wilkinson-extended')).toBeDefined();
    expect(getTickMethod('r-pretty')).toBeDefined();
    expect(getTickMethod('time-pretty')).toBeDefined();
    expect(getTickMethod('log')).toBeDefined();
    expect(getTickMethod('pow')).toBeDefined();
    expect(getTickMethod('quantile')).toBeDefined();
    expect(getTickMethod('d3-linear')).toBeDefined();
  });
});
