# Log

Log scales creates a Log based scale, before calculating the output range value, the logarithmic transformation will be applied to the input domain value.

## Usage

```ts
const scale = new Log({
  domain: [1, 10],
  range: [0, 1],
  exponent: 2
});

scale.map(1); // 0
scale.map(2); // 0.301
scale.invert(0.301); // 2
```

## Options

| Key | Description | Type | Default|  
| ----| ----------- | -----| -------|
| domain | Sets the scale’s domain to the specified array of values. | `number[]` | `[0, 1]` |
| range | Sets the scale’s range to the specified array of values. | `number[]` | `[0, 1]` |
| unknown | Sets the output value of the scale for `undefined` (or `NaN`) input values. | `any` | `undefined` |
| formatter | Sets the format function to display a tick value. | `(x: any) => string` | ```(x) => `${x}```|
| tickCount | Sets approximately count representative values from the scale’s domain. | `number` | `5` |
| tickMethod | Sets the method for computing representative values from the scale’s domain. | `(options?: LogOptions) => number[]` | `wilkinson-extended` |
| round | round the output of map or invert. | `boolean` | `false` |
| clamp | If clamp option is truthy, the return value of the scale is always within the scale’s range. | `boolean` | `false` |
| nice | Extends the domain so that it starts and ends on nice round values. | `boolean` | `false` |
| interpolate | If interpolate is specified, sets the scale’s range interpolator factory. | `(a: number, b: number) => (t: number) => number` | `(a, b) => (t) => a * (1 - t) + b * t` |
| base | Sets the base for this logarithmic scale to the specified value. | `number` | `10` |

## Methods

<a name="Log_map" href="#Log_map">#</a> **map**<i>(x: number): number</i>

Given a value in the input domain, returns the corresponding value in the output range if it is not `undefined` (or `NaN`), otherwise `options.unknown`

<a name="Log_invert" href="#Log_invert">#</a> **invert**<i>(x: number): number</i>

Given a value from the range, returns the corresponding value from the domain.

<a name="Log_update" href="#Log_update">#</a> **update**<i>(options: LogOptions): void</i>

Update the scale's options and rescale.

<a name="Log_getOptions" href="#Log_getOptions">#</a> **getOptions**<i>(): LogOptions</i>

Returns the scale's current options.

<a name="Log_clone" href="#Log_clone">#</a> **clone**<i>(): Log</i>

Returns a new Log scale with the independent and same options as the original one.

<a name="Log_get_ticks" href="#Log_get_ticks">#</a> **getTicks**<i>(): number[]</i>

Returns a series of representative values from the scale’s domain.
