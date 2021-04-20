import * as d3 from 'd3-scale';
import { Band } from '../../src';
import { benchMarkBetween } from './benchmark';

describe('band perf test', () => {
  test('100000 map and update call, antv is eight times faster than d3', async () => {
    const domain = new Array(10000).fill('').map((item, index) => index);

    const antvTest = () => {
      const antvScale = new Band({
        domain,
        range: [0, 100000],
      });

      for (let i = 0; i < 100000; i += 1) {
        antvScale.map(i);
        if (i % 1000 === 0) {
          antvScale.update({
            domain: [0, 100000],
            range: [0, 100000],
          });
        }
      }
    };

    const d3Test = () => {
      const d3Scale = d3.scaleBand().domain(domain).range([0, 100000]);
      for (let i = 0; i < 100000; i += 1) {
        d3Scale(i);
        if (i % 1000 === 0) {
          d3Scale.domain(domain).range([0, 100000]);
        }
      }
    };
    // antv 比 d3 快 9 倍
    await benchMarkBetween({
      cb1: antvTest,
      cb2: d3Test,
      magnification: 8,
      check: true,
    });
  });
});
