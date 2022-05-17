import Linear from '../../src/continuous/linear';
import '../../src/tick-method/index';

describe('linear with large number', () => {
  it('', () => {
    const scale = new Linear({
      values: [0.016997174265683153, 0.016978731393179597, 0.01693915668503243, 1.6986827490797e299],
    });
    expect(scale.getTicks().length).toBe(4);
  });
});
