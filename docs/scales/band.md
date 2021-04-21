# Band

Band scales are a special case of ordinal scales where the range is continuous.

For example, in the bar chart, the horizontal positions of the bars is given by a band scale.

The figure in the [options](#options) will give you a better understanding of this scale.

## Usage

```ts
import { Band, BandOptions } from '@antv/scale';

const options: BandOptions = {
  domain: ['one', 'two', 'three', 'four'],
  range: [0, 100],
};

const x = new Band(options);

x.map('one'); // 0
x.map('two'); // 25
x.invert(50); // 'three'
x.invert(75); // 'four'
x.getBandWidth();  // 25
```

## Options

| Key | Description | Type | Default|  
| ----| ----------- | -----| -------|
| domain | Sets the scale’s domain to the specified array of values. | <code>number[] &#124; string[]</code> | `[]` |
| range | Sets the scale’s range to the specified array of values. | `number[]` | `[0, 1]` |
| unknown | Sets the output value of the scale for `undefined` (or `NaN`) input values. | `any` | `undefined` |
| formatter | Sets the format function to display the output value. | `(x: any) => string` | <code>(x) => &#96;${x}&#96;</code>|
| round | If round option is truthy, the start and stop of each band will be integers. | `boolean` | `false` |
| paddingInner | Set the scale's paddingInner, the value should in the range [0, 1]. For more info, please see the [example](#example) below | `number` | `0` |
| paddingOuter | Set the scale's paddingOuter, the value should in the range [0, 1]. For more info, please see the [example](#example) below | `number` | `0` |
| padding | An easy way to set the paddingInner and paddingOuter for the scale. Notice: It's priority is higher than `paddingInner` and `paddingOuter` | `number` | `0` |
| align | The `align` option specifies how outer padding is distributed in the range, the value should in the range [0, 1]. For example, value of 0.5 means that bands should be centered within the range, value of 0 or 1 may be used to shift the bands to one side. | `number` | `0.5` |
| compare | Sets the comparator for sorting the domain before mapping. | ```(a: string or number, b: string or number) => number```| `undefined` |

<a name="band_map" href="#example">**Example**</a>

```plain
PO = paddingOuter
PI = paddingInner
align = 0.5

domain = [A, B]

|<------------------------------------------- range ------------------------------------------->|
|             |                   |             |                   |             |             |
|<--step*PO-->|<----bandWidth---->|<--step*PI-->|<----bandWidth---->|<--step*PI-->|<--step*PO-->|
|             | ***************** |             | ***************** |             |             |
|             | ******* A ******* |             | ******* B ******* |             |             |
|             | ***************** |             | ***************** |             |             |
|             |<--------------step------------->|                                               |
|-----------------------------------------------------------------------------------------------|
```

## Methods

<a name="band_map" href="#band_map">#</a> **map**<i>(x: number | string): number</i>

Given a value in the input domain, returns the corresponding value in the output range if it is not `undefined` (or `NaN`), otherwise `options.unknown`

<a name="Band_invert" href="#Pow_invert">#</a> **invert**<i>(x: number): number | string</i>

Given a value from the range, returns the corresponding value from the domain.

<a name="band_update" href="#band_update">#</a> **update**<i>(options: BandOptions): void</i>

Update the scale's options and rescale.

<a name="band_getOptions" href="#band_getOptions">#</a> **getOptions**<i>(): BandOptions</i>

Returns the scale's current options.

<a name="band_clone" href="#band_clone">#</a> **clone**<i>(): Band</i>

Returns a new band scale with the independent and same options as the original one.

<a name="band_step" href="#band_clone">#</a> **getStep**<i>(): number</i>

Returns band scale's step, for more info about `step`, please see [example](#example).

<a name="band_get_band_width" href="#band_get_band_width">#</a> **getBandWidth**<i>(): number</i>

Returns band scale's bandWidth, for more info about this, please see [example](#example).

<a name="band_get_range" href="#band_get_range">#</a> **getRange**<i>(): number[]</i>

Returns band scale's adjusted range [example](#example).
