# Point

Point scales are a special case of band scales that the bandwidth always fixed to zero.

## Usage

```ts
import { Point, PointOptions } from '@antv/scale';

const options: PointOptions = {
  domain: ["A", "B", "C", "D"],
  padding: 0.5,
  round: true,
  range: [0, 600]
}

const x = new Point(options);

scale.map('A') // 75
scale.getStep(); // 150
scale.getBandWidth(); // always 0
```

## Options

| Key | Description | Type | Default|  
| ----| ----------- | -----| -------|
| domain | Sets the scale’s domain to the specified array of values. | <code>number[] &#124; string[]</code> | `[]` |
| range | Sets the scale’s range to the specified array of values. | `number[]` | `[0, 1]` |
| unknown | Sets the output value of the scale for `undefined` (or `NaN`) input values. | `any` | `undefined` |
| formatter | Sets the format function to display the output value. | `(x: any) => string` | <code>(x) => &#96;${x}&#96;</code> |
| round | If round option is truthy, the start and stop of each point will be integers. | `boolean` | `false` |
| padding | Set the scale's padding. In fact, this is the `outerPadding` of the band option. For more info about this, please see [example](#example). | `number` | `0` |
| align | The `align` option specifies how outer padding is distributed in the range, the value should in the range [0, 1]. For example, value of 0.5 means that points should be centered within the range, value of 0 or 1 may be used to shift the points to one side. | `number` | `0.5` |

<a name="point_map" href="#example">**Example**</a>

```plain
We can easily find that point scale's bandwidth is always zero.

PO = Padding = PaddingInner
domain =  ["A", "B", "C"]


|<------------------------------------------- range ------------------------------------------->|
|             |                                 |                                 |             |
|<--step*PO-->|<--------------step------------->|<--------------step------------->|<--step*PO-->|
|             |                                 |                                 |             |
|             A                                 B                                 C             |
|-----------------------------------------------------------------------------------------------|
```

## Methods

<a name="point_map" href="#point_map">#</a> **map**<i>(x: number | string): number</i>

Given a value in the input domain, returns the corresponding value in the output range if it is not `undefined` (or `NaN`), otherwise `options.unknown`

<a name="point_invert" href="#point_invert">#</a> **invert**<i>(x: number): number | string</i>

Given a value from the range, returns the corresponding value from the domain.

<a name="point_update" href="#point_update">#</a> **update**<i>(options: PointOptions): void</i>

Update the scale's options and rescale.

<a name="point_getOptions" href="#point_getOptions">#</a> **getOptions**<i>(): PointOptions</i>

Returns the scale's current options.

<a name="point_clone" href="#point_clone">#</a> **clone**<i>(): Point</i>

Returns a new point scale with the independent and same options as the original one.

<a name="point_step" href="#point_clone">#</a> **getStep**<i>(): number</i>

Returns point scale's step, for more info about this, please see [example](#example).

<a name="point_get_band_width" href="#point_get_band_width">#</a> **getBandWidth**<i>(): number</i>

Returns point scale's `bandWidth`, In fact, the value is always 0. For more info about this, please
see [example](#example).
