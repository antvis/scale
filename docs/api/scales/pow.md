# Pow

Similar to [linear scales](./linear.md), except an exponential transform is applied to the input domain value before the output range value is computed. Each range value y can be expressed as a function of the domain value x: `y = x ^ exponent + b`. ([online demo](https://observablehq.com/@pearmini/antv-scale#pow))

## Usage

```ts
import {Pow, PowOptions} from '@antv/scale';

const options: PowOptions = {
  domain: [0, 100],
  range: [0, 100],
  exponent: 2
}

const scale = new Pow(options);

scale.map(0); // 0
scale.map(50); // 25
scale.invert(50); // 25
```

More usages reference [linear scale](./linear.md#usage).

## Options

| Key | Description | Type | Default|  
| ----| ----------- | -----| -------|
| domain | Sets the scale’s domain to the specified array of values. | `number[]` | `[0, 1]` |
| range | Sets the scale’s range to the specified array of values. | `<code>number[] &#124; string[]</code>` | `[0, 1]` |
| unknown | Sets the output value of the scale for `undefined` (or `NaN`) input values. | `any` | `undefined` |
| tickCount | Sets approximately count representative values from the scale’s domain. **The specified `tickCount` in options is only a hint: the scale may return more or fewer values depending on the domain.** | `number` | `5` |
| tickMethod | Sets the method for computing representative values from the scale’s domain. | `(min: number, max: number, count: number) => number[]` | `calculatePowTicks` |
| round | Rounds the output of map or invert if it is true. | `boolean` | `false` |
| clamp | Constrains the return value of map within the scale’s range if it is true. | `boolean` | `false` |
| nice | Extends the domain so that it starts and ends on nice round values if it is true. | `boolean` | `false` |
| interpolate | Sets the scale’s range interpolator factory if it is specified. | `(a: number, b: number) => (t: number) => number` | `(a, b) => (t) => a * (1 - t) + b * t` |
| exponent | Sets the scale’s exponent for map or invert methods. | `number` | `2` |

## Methods

<a name="pow_map" href="#pow_map">#</a> **map**<i>(x: number): number</i>

Given a value in the input domain, returns the corresponding value in the output range if it is not `undefined` (or `NaN`), otherwise `options.unknown`

<a name="pow_invert" href="#pow_invert">#</a> **invert**<i>(x: number): number</i>

Given a value from the range, returns the corresponding value from the domain.

<a name="pow_update" href="#pow_update">#</a> **update**<i>(options: PowOptions): void</i>

Updates the scale's options and rescale.

<a name="pow_get_options" href="#pow_get_options">#</a> **getOptions**<i>(): PowOptions</i>

Returns the scale's current options.

<a name="row_clone" href="#row_clone">#</a> **clone**<i>(): Pow</i>

Returns a new Pow scale with the independent and same options as the original one.

<a name="row_get_ticks" href="#row_get_ticks">#</a> **getTicks**<i>(): number[]</i>

Returns representative values from the scale’s domain computed by specified `options.tickMethod` with `options.tickCount`.
