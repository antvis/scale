# Quantile

Similar to [threshold scales](./threshold.md), but computed cut values based on quantile(ranking of each data). ([online demo](https://observablehq.com/@pearmini/antv-scale#quantile))

## Usage

```ts
import { Quantile, QuantileOptions } from '@antv/scale';

const options: QuantileOptions = {
  domain: [0, 20, 40],
  range: ['a', 'b', 'c', 'd'],
};

const x = new Quantile(options);

x.map(0); // 'a'
x.map(10); // 'b'
x.map(20); // 'c'
x.invert('a'); // [0, 10]
x.invert('b'); // [10, 20]
x.invert('c'); // [20, 30]
x.getThresholds(); // [10, 20, 30]
```

## Options

| Key | Description | Type | Default|  
| ----| ----------- | -----| -------|
| domain |Sets the scale’s domain to the specified array of values. | `number[]` | `[]` |
| range | Sets the scale’s range to the specified array of values. | `any[]` | `[]` |
| unknown | Sets the output value of the scale for `undefined` (or `NaN`) input values. | `any` | `undefined` |

## Methods

<a name="quantile_map" href="#quantile_map">#</a> **map**<i>(x: number): any</i>

Given a value in the input domain, returns the corresponding value in the output range if it is not `undefined` (or `NaN`), otherwise `options.unknown`.

<a name="quantile_invert" href="#quantile_invert">#</a> **invert**<i>(x: any): (number | undefined)[]</i>

Returns the extent of values in the domain [x0, x1] for the corresponding value in the range, representing the inverse mapping from range to domain.

<a name="quantile_update" href="#quantile_update">#</a> **update**<i>(options: QuantileOptions): void</i>

Update the scale's options and rescale.

<a name="quantile_getOptions" href="#quantile_getOptions">#</a> **getOptions**<i>(): QuantileOptions</i>

Returns the scale's current options.

<a name="quantile_clone" href="#quantile_clone">#</a> **clone**<i>(): Quantile</i>

Returns a new Quantile scale with the independent and same options as the original one.

<a name="quantile_get_ticks" href="#quantile_get_ticks">#</a> **getTicks**<i>(): number[]</i>

Returns a series of representative values from the scale’s domain.

<a name="quantile_get_thresholds" href="#quantile_get_thresholds">#</a> **getThresholds**<i>(): number[]</i>

Returns the array of computed thresholds within the domain.
