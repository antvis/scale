import { getScale, registerScale, Scale, registerTickMethod, getTickMethod } from '../../src';
import newTimeCat from '../../src/tick-method/time-cat';

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

  it('registerTickMethod func', () => {
    registerTickMethod('newCat', newTimeCat);
    expect(getTickMethod('newCat')).not.toBeUndefined();
  });
});
