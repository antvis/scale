import { getScale, registerScale, Scale } from '../../src';

describe('scale index', () => {
  class Custom extends Scale {
    public scale(v) {
      return v;
    }
    public invert(v) {
      return v;
    }
  }

  registerScale('custom', Custom);

  it('getScale func', () => {
    const scale = getScale('custom');
    expect(scale).toBe(Custom);
  });
});
