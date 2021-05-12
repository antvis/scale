# Quantize

Similar to [threshold scales](./threshold.md), but computed cut values based on size of each data. ([online demo](https://observablehq.com/@pearmini/antv-scale#quantize))

## Usage

```ts
import { Quantize, QuantizeOptions } from '@antv/scale';

const options: QuantizeOptions = {
  range: ['a', 'b' ,'c'],
};

const x = new Quantize(options);

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

x.getThresholds(); // [1 / 3, 2 / 3]
```

## Options

| Key | Description | Type | Default|  
| ----| ----------- | -----| -------|
| domain | Sets the scale’s domain to the specified two-element array of values. The values must be in ascending order. | `number[]` | `[0, 1]` |
| range | Sets the scale’s range to the specified array of values. | `any[]` | `[0.5]` |
| unknown | Sets the output value of the scale for `undefined` (or `NaN`) input values. | `any` | `undefined` |
| nice | Extends the domain so that it starts and ends on nice round values. | `boolean` | `false` |

## Methods

<a name="quantize_map" href="#quantize_map">#</a> **map**<i>(x: number): any</i>

Given a value in the input domain, returns the corresponding value in the output range if it is not `undefined` (or `NaN`), otherwise `options.unknown`.

<a name="quantize_invert" href="#quantize_invert">#</a> **invert**<i>(x: any): (number | undefined)[]</i>

Returns the extent of values in the domain [x0, x1] for the corresponding value in the range, representing the inverse mapping from range to domain.

<a name="quantize_update" href="#quantize_update">#</a> **update**<i>(options: QuantizeOptions): void</i>

Update the scale's options and rescale.

<a name="quantize_getOptions" href="#quantize_getOptions">#</a> **getOptions**<i>(): QuantizeOptions</i>

Returns the scale's current options.

<a name="quantize_clone" href="#quantize_clone">#</a> **clone**<i>(): Quantize</i>

Returns a new quantize scale with the independent and same options as the original one.

<a name="quantize_get_ticks" href="#quantize_get_ticks">#</a> **getTicks**<i>(): number[]</i>

Returns a series of representative values from the scale’s domain.

<a name="quantize_get_thresholds" href="#quantize_get_thresholds">#</a> **getThresholds**<i>(): number[]</i>

Returns the array of computed thresholds within the domain.
