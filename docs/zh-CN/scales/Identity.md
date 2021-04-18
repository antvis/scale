# Identity


## Usage
TODO

## Options
| Key | Description | Type | Default|
| ----| ----------- | -----| -------|
| unknown | 当需要映射的值不合法的时候，返回的值 | <code>any</code> | `[]` |
| range | 值域，默认为 [0, 1] | <code>number[]</code> | `[]` |
| domain | 定义域，默认为 [0, 1] | <code>number[]</code> | `[]` |
| formatter | tick 格式化函数，会影响数据在坐标轴 axis、legend、tooltip 上的显示 | <code>(x: number) => string</code> | `[]` |
| tickCount | tick 个数，默认值为 5 | <code>number</code> | `[]` |
| tickMethod | 计算 ticks 的算法 | <code>import("D:/projects/scale/src/types").TickMethod</code> | `[]` |