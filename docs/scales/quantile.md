# Quantile

Similar to the Threshold scale, quantile scale maps a discrete input domain to a discrete output domain.

The input domain is designated as a set of discrete sample values, and the number of values in the output domain determines the number of quantiles.

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
| formatter | Sets the format function to display a tick value. | `(x: any) => string` | <code>(x) => &#96;${x}&#96;</code> |

## Methods

<a name="Quantile_map" href="#Quantile_map">#</a> **map**<i>(x: number): any</i>

Given a value in the input domain, returns the corresponding value in the output range if it is not `undefined` (or `NaN`), otherwise `options.unknown`.

<a name="Quantile_invert" href="#Quantile_invert">#</a> **invert**<i>(x: any): (number | undefined)[]</i>

Returns the extent of values in the domain [x0, x1] for the corresponding value in the range, representing the inverse mapping from range to domain.

<a name="Quantile_update" href="#Quantile_update">#</a> **update**<i>(options: QuantileOptions): void</i>

Update the scale's options and rescale.

<a name="Quantile_getOptions" href="#Quantile_getOptions">#</a> **getOptions**<i>(): QuantileOptions</i>

Returns the scale's current options.

<a name="Quantile_clone" href="#Quantile_clone">#</a> **clone**<i>(): Quantile</i>

Returns a new Quantile scale with the independent and same options as the original one.

<a name="Quantile_get_ticks" href="#Quantile_get_ticks">#</a> **getTicks**<i>(): number[]</i>

Returns a series of representative values from the scale’s domain.

<a name="Quantile_get_thresholds" href="#Quantile_get_thresholds">#</a> **getThresholds**<i>(): number[]</i>

Returns the array of computed thresholds within the domain.
