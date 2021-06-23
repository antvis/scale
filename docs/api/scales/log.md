# Log

Similar to [linear scales](./linear.md), except an logarithmic transform is applied to the input domain value before the output range value is computed. Each range value y can be expressed as a function of the domain value x: `y = log(x) + b`. ([online demo](https://observablehq.com/@pearmini/antv-scale#log))

## Usage

```ts
import { Log, LogOptions } from '@antv/scale';

const options: LogOptions = {
  domain: [1, 10],
  range: [0, 1],
  base: 10
};

const x = new Log(options);

x.map(1); // 0
x.map(2); // 0.301
x.invert(0.301); // 2
```

More usages reference [linear scale](./linear.md#usage).

## Options

| Key | Description | Type | Default|  
| ----| ----------- | -----| -------|
| domain | Sets the scale’s domain to the specified array of values. **A log scale domain must be strictly-positive or strictly-negative; the domain must not include or cross zero.**  | `number[]` | `[0, 1]` |
| range | Sets the scale’s range to the specified array of values. | `<code>number[] &#124; string[]</code>` | `[0, 1]` |
| unknown | Sets the output value of the scale for `undefined` (or `NaN`) input values. | `any` | `undefined` |
| tickCount | Sets approximately count representative values from the scale’s domain. **The specified `tickCount` in options is only a hint: the scale may return more or fewer values depending on the domain.** | `number` | `5` |
| tickMethod | Sets the method for computing representative values from the scale’s domain. | `(min: number, max: number, count: number, base: number) => number[]` | `d3-ticks` |
| round | Rounds the output of map or invert if it is true. | `boolean` | `false` |
| clamp | Constrains the return value of map within the scale’s range if it is true. | `boolean` | `false` |
| nice | Extends the domain so that it starts and ends on nice round values if it is true. | `boolean` | `false` |
| interpolate | Sets the scale’s range interpolator factory if it is specified.  | `(a: number, b: number) => (t: number) => number` | `(a, b) => (t) => a * (1 - t) + b * t` |
| base | Sets the base for this logarithmic scale if it is specified. | `number` | `10` |

## Methods

<a name="log_map" href="#log_map">#</a> **map**<i>(x: number): number</i>

Given a value in the input domain, returns the corresponding value in the output range if it is not `undefined` (or `NaN`), otherwise `options.unknown`

<a name="log_invert" href="#log_invert">#</a> **invert**<i>(x: number): number</i>

Given a value from the range, returns the corresponding value from the domain.

<a name="log_update" href="#log_update">#</a> **update**<i>(options: LogOptions): void</i>

Updates the scale's options and rescale.

<a name="log_get_options" href="#log_get_options">#</a> **getOptions**<i>(): LogOptions</i>

Returns the scale's current options.

<a name="Log_clone" href="#Log_clone">#</a> **clone**<i>(): Log</i>

Returns a new Log scale with the independent and same options as the original one.

<a name="Log_get_ticks" href="#Log_get_ticks">#</a> **getTicks**<i>(): number[]</i>

Returns representative values from the scale’s domain computed by specified `options.tickMethod` with `options.tickCount`.
