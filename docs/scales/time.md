# Time

Time scales are a special case of linear scale.

## Usage

```ts
import { Time, TimeOptions } from '@antv/scale';

const options: TimeOptions = {
  range: [0, 960],
  domain: [new Date(2000, 0, 1), new Date(2000, 0, 2)],
};

// basic usage
const time = new Time(options);
time.map(new Date(2000, 0, 1, 5)); //200;
time.map(new Date(2000, 0, 1, 16)); //640;
time.invert(200); // new Date(2000, 0, 1, 5);

// nice formatter
const niceFormatter = new Time().getFormatter();
const date = new Date(2021, 3, 25);
niceFormatter(date) // 'Sun 25'

// custom formatter
time.update({
  mask:'[Hello] YYYY'
})
const customFormatter = time.getFormatter();
customFormatter(date) // 'Hello 20201'

```

## Options

| Key | Description | Type | Default|  
| ----| ----------- | -----| -------|
| domain | Sets the scale’s domain to the specified array of values. | `Date[]` | `[0, 1]` |
| range | Sets the scale’s range to the specified array of values. | `Date[]` | `[0, 1]` |
| unknown | Sets the output value of the scale for `undefined` (or `NaN`) input values. | `any` | `undefined` |
| tickCount | Sets approximately count representative values from the scale’s domain. | `number` | `5` |
| tickMethod | Sets the method for computing representative values from the scale’s domain. | `(options?: TimeOptions) => Date[]` | `d3Time` |
| round | round the output of map or invert. | `boolean` | `false` |
| clamp | If clamp option is truthy, the return value of the scale is always within the scale’s range. | `boolean` | `false` |
| nice | Extends the domain so that it starts and ends on nice round values. | `boolean` | `false` |
| mask | Sets format of tick value. | `string` | `undefined` |
| utc | Takes local or UTC time. | `boolean` | `false` |
| interpolate | If interpolate is specified, sets the scale’s range interpolator factory. | `(a: number, b: number) => (t: number) => T` | `(a, b) => (t) => a * (1 - t) + b * t` |

## Methods

<a name="Time_map" href="#Time_map">#</a> **map**<i>(x: Date): number</i>

Given a value in the input domain, returns the corresponding value in the output range if it is not `undefined` (or `NaN`), otherwise `options.unknown`

<a name="Time_invert" href="#Time_invert">#</a> **invert**<i>(x: Date): number</i>

Given a value from the range, returns the corresponding value from the domain.

<a name="Time_update" href="#Time_update">#</a> **update**<i>(options: TimeOptions): void</i>

Update the scale's options and rescale.

<a name="Time_getOptions" href="#Time_getOptions">#</a> **getOptions**<i>(): TimeOptions</i>

Returns the scale's current options.

<a name="Time_clone" href="#Time_clone">#</a> **clone**<i>(): Time</i>

Returns a new Time scale with the independent and same options as the original one.

<a name="Time_get_ticks" href="#Time_get_ticks">#</a> **getTicks**<i>(): number[]</i>

Returns a series of representative values from the scale’s domain.

<a name="Time_get_formatter" href="#Time_get_formatter">#</a> **getFormatter**<i>(): Formatter</i>

Returns nice formatter if `options.mask` is not specified otherwise custom formatter based on specified `options.mask`.
