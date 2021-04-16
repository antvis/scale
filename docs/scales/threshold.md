# Threshold

Threshold scales allow you divide continuous domain into slices and map value in each slice to discrete values in the range.

## Usage

```ts
import { Threshold, ThresholdOptions } from '@antv/scale';

/*
** (-Infinity, 1 / 3] -> 'a'
** [1 / 3 , 2 / 3) -> 'b'
** [2 / 3, Infinity) -> 'c'
*/
const options: ThresholdOptions = {
  domain: [1 / 3, 2 / 3],
  range: ['a', 'b' ,'c'],
};

const x = new Identity(options);

x.map(0); // 'a'
x.map(0.2); // 'a'
x.map(0.4); // 'b'
x.map(0.6); // 'b'
x.map(0.8); // 'c'
x.map(1); // 'c'

x.invert('a'); // [undefined, 1 / 3]
x.invert('b'); // [1 / 3, 2 / 3]
x.invert('c'); // [2 / 3, undefined]
x.invert('d'); // [undefined,undefined]
```

## Options

| Key | Description | Type | Default|  
| ----| ----------- | -----| -------|
| domain | Sets the scale’s domain to the specified array of values. The values must be in ascending order and will divide the domain into slices based on them. | `number[]` | `[0.5]` |
| range | Sets the scale’s range to the specified array of values. | `any[]` | `[0, 1]` |
| unknown | Sets the output value of the scale for `undefined` (or `NaN`) input values. | `any` | `undefined` |
| formatter | Sets the format function to display a tick value. | `(x: any) => string` | ```(x) => `${x}```|

## Methods

<a name="threshold_map" href="#threshold_map">#</a> **map**<i>(x: number): any</i>

Returns the input value itself if it is not `undefined` (or `NaN`), otherwise `options.unknown`.

<a name="threshold_invert" href="#threshold_invert">#</a> **invert**<i>(x: any): (number | undefined)[]</i>

Returns the extent of values in the domain [x0, x1] for the corresponding value in the range, representing the inverse mapping from range to domain.

<a name="threshold_update" href="#threshold_update">#</a> **update**<i>(options: ThresholdOptions): void</i>

Update the scale's options and rescale.

<a name="threshold_getOptions" href="#threshold_getOptions">#</a> **getOptions**<i>(): ThresholdOptions</i>

Returns the scale's current options.

<a name="threshold_clone" href="#threshold_clone">#</a> **clone**<i>(): Threshold</i>

Returns a new threshold scale with the independent and same options as the original one.
