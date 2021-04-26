import { d3TimeNice } from '../../../src/utils';

describe('d3TimeNice', () => {
  test('d3TimeNice returns original min and max right now', () => {
    expect(d3TimeNice(new Date(2020, 3, 5), new Date(2020, 3, 10))).toEqual([
      new Date(2020, 3, 5),
      new Date(2020, 3, 10),
    ]);
  });
});
