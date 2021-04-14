import * as d3 from 'd3-scale';
import { Category } from '../../src/scales/category';
import { benchMarkBetween } from './benchmark';

describe('category perf test', () => {
  test('100000 map and update call', async () => {
    const domain = new Array(100000).fill('').map((item, index) => index);
    const range = new Array(100000).fill('').map((item, index) => index);

    const timeForAntv = () => {
      const antvScale = new Category({
        domain,
        range,
      });
      for (let i = 0; i < 100000; i += 1) {
        antvScale.map(i);
        // 中途重置 domain
        if (i % 4000 === 0) {
          antvScale.update({
            domain: range,
            range,
          });
        }
      }
    };

    const timeForD3 = () => {
      const d3Scale = d3.scaleOrdinal().domain(domain).range(range);
      for (let i = 0; i < 100000; i += 1) {
        d3Scale(i);
        if (i % 4000 === 0) {
          // 中途重置 domain
          d3Scale.domain(range).range(range);
        }
      }
    };

    await benchMarkBetween({
      cb1: timeForAntv,
      cb2: timeForD3,
      // TODO: 这里有较大幅度的摇摆，先改为 1.0，后续优化
      magnification: 1.0,
      check: true,
    });
  });
});
