# Linear

Linear scales indicate a linear relationship between input and output.

## Usage

```ts
import { Linear, LinearOptions } from '@antv/scale';

const options: LinearOptions = {
  domain: [0, 100],
  range: [500, 1000]
};

const x = new Linear(options);

x.map(0); // 500
x.map(100); // 1000
x.invert(1000); // 100
x.invert(500); // 0
```

## Options

| Key | Description | Type | Default|  
| ----| ----------- | -----| -------|
| domain | Sets the scale’s domain to the specified array of values. | `number[]` | `[0, 1]` |
| range | Sets the scale’s range to the specified array of values. | `number[]` | `[0, 1]` |
| unknown | Sets the output value of the scale for `undefined` (or `NaN`) input values. | `any` | `undefined` |
| formatter | Sets the format function to display a tick value. | `(x: any) => string` | <code>(x) => &#96;${x}&#96;</code> |
| tickCount | Sets approximately count representative values from the scale’s domain. | `number` | `5` |
| tickMethod | Sets the method for computing representative values from the scale’s domain. | `(options?: LinearOptions) => number[]` | `linerTick` |
| round | round the output of map or invert. | `boolean` | `false` |
| clamp | If clamp option is truthy, the return value of the scale is always within the scale’s range. | `boolean` | `false` |
| nice | Extends the domain so that it starts and ends on nice round values. | `boolean` | `false` |
| interpolate | If interpolate is specified, sets the scale’s range interpolator factory. | `(a: number, b: number) => (t: number) => T` | `(a, b) => (t) => a * (1 - t) + b * t` |

## Methods

<a name="Linear_map" href="#Linear_map">#</a> **map**<i>(x: number): number</i>

Given a value in the input domain, returns the corresponding value in the output range if it is not `undefined` (or `NaN`), otherwise `options.unknown`

<a name="Linear_invert" href="#Linear_invert">#</a> **invert**<i>(x: number): number</i>

Given a value from the range, returns the corresponding value from the domain.

<a name="Linear_update" href="#Linear_update">#</a> **update**<i>(options: LinearOptions): void</i>

Update the scale's options and rescale.

<a name="Linear_getOptions" href="#Linear_getOptions">#</a> **getOptions**<i>(): LinearOptions</i>

Returns the scale's current options.

<a name="Linear_clone" href="#Linear_clone">#</a> **clone**<i>(): Linear</i>

Returns a new Linear scale with the independent and same options as the original one.

<a name="Linear_get_ticks" href="#Linear_get_ticks">#</a> **getTicks**<i>(): number[]</i>

Returns a series of representative values from the scale’s domain.
