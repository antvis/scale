# Threshold

将连续的定义域分段，每一段所有的值对应离散的值域中一个值

## Usage
TODO

## Options
| Key | Description | Type | Default|
| ----| ----------- | -----| -------|
| unknown | 当需要映射的值不合法的时候，返回的值 | <code>any</code> | `[]` |
| range | 值域，默认为 [0, 1] | <code>any[]</code> | `[]` |
| domain | 定义域，默认为 [0, 1] | <code>number[]</code> | `[]` |
| formatter | tick 格式化函数，会影响数据在坐标轴 axis、legend、tooltip 上的显示 | <code>(x: any) => string</code> | `[]` |