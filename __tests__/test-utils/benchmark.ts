import Benchmark from 'benchmark';

/**
 * benchMark 两个回调函数, 并为倍率进行断言
 * 由于本库经常要和 d3 进行性能优化，故添加了这个工具函数
 *
 * @param cb1 回调函数 1
 * @param cb2 回调函数 2
 * @param magnification 期望的倍率，默认为 1
 * @param check 执行断言
 */
export const benchMarkBetween = async (
  cb1: Function,
  cb2: Function,
  magnification: number = 1,
  check: boolean = true
) =>
  new Promise((resolve) => {
    // test env, do not use browser to prevent bugs
    Benchmark.support.browser = false;
    const suite = new Benchmark.Suite();

    suite
      .add(cb1.name || 'first', () => {
        cb1();
      })
      .add(cb2.name || 'second', () => {
        cb2();
      })
      // add listeners
      .on('cycle', (event) => {
        console.log(String(event.target));
      })
      .on('complete', function () {
        const first = this[0];
        const second = this[1];
        if (check) {
          expect(first.hz / magnification).toBeGreaterThan(second.hz);
        }
        resolve({
          first,
          second,
        });
      });
    suite.run();
  });
