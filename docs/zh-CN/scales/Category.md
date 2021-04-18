# Category

Category 比例尺

该比例尺具有离散的域和范围，例如将一组命名类别映射到一组颜色

- 使用 for 替代一些基于 map 的遍历，for 循环性能远高于 forEach, map
- 阻止无意义的更新，只有到用户调用 map、invert 或者 update 之后才会进行相应的更新
- 两个 map 只初始化一次，在之后的更新中复用他们，这样我们避免了重复 new Map 带来的性能问题
  在大量调用 update 函数场景下，较 d3-scale 效率有质的提高

## Usage
TODO

## Options
| Key | Description | Type | Default|
| ----| ----------- | -----| -------|
| unknown | 当需要映射的值不合法的时候，返回的值 | <code>any</code> | `[]` |
| range | 值域，默认为 [0, 1] | <code>(string 丨 number)[]</code> | `[]` |
| domain | 定义域，默认为 [0, 1] | <code>(string 丨 number)[]</code> | `[]` |
| formatter | tick 格式化函数，会影响数据在坐标轴 axis、legend、tooltip 上的显示 | <code>(x: string 丨 number) => string</code> | `[]` |