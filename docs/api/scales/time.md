# Time

Similar to [linear scales](./linear.md), but have a have a temporal domain. Each range value y can be expressed as a function of the domain value x: `y = x.getTime() + b`. ([online demo](https://observablehq.com/@pearmini/antv-scale#time))

## Usage

- Basic usage

```ts
import { Time, TimeOptions } from '@antv/scale';

const options: TimeOptions = {
  range: [0, 960],
  domain: [new Date(2000, 0, 1), new Date(2000, 0, 2)],
};

const time = new Time(options);
time.map(new Date(2000, 0, 1, 5)); //200;
time.map(new Date(2000, 0, 1, 16)); //640;
time.invert(200); // new Date(2000, 0, 1, 5);
```

- Nice Formatter

```ts
import { Time } from '@antv/scale';
const formatter = new Time().getFormatter();

formatter(new Date(2021, 11, 31, 23, 59, 59, 999)); // '.999'
formatter(new Date(2021, 11, 31, 23, 59, 59)); // ':59'
formatter(new Date(2021, 11, 31, 23, 59)); // '11:59'
formatter(new Date(2021, 11, 31, 23)); // ''11 PM''
formatter(new Date(2021, 3, 26)); // 'Apr 26'
formatter(new Date(2021, 3, 25)); // 'Sun 25'
formatter(new Date(2021, 3)); // 'April'
formatter(new Date(2021, 0)); // '2021'
```

- Customize formatter

```ts
import { Time } from '@antv/scale';

const formatter = new Time({ mask:'[Hello] YYYY' }).getFormatter();

formatter(new Date(2021, 3, 25)) // 'Hello 20201'
formatter(new Date(2021, 3)); // 'Hello 20201'
```

- Nice domain by tickCount

```ts
import { Time } from '@antv/scale';

const domain = [new Date(2009, 0, 1, 0, 17), new Date(2009, 0, 1, 23, 42)];

const t0 = new Time({
  domain,
  tickCount: 10
});
const t1 = new Time({
  domain,
  tickCount: 100
});

t0.getOptions().domain; // [new Date(2009, 0, 1), new Date(2009, 0, 2)]
t1.getOptions().domain; // [new Date(2009, 0, 1, 0, 15), new Date(2009, 0, 1, 23, 45)]
```

- Nice domain by tickInterval

```ts
import { Time, DURATION_DAY, DURATION_WEEK, DURATION_MONTH } from '@antv/scale';

const domain = [new Date(2009, 0, 1, 0, 12),  new Date(2009, 0, 1, 23, 48)];

const t0 = new Time({
  domain,
  tickInterval: DURATION_DAY
});
const t1 = new Time({
  domain,
  tickInterval: DURATION_WEEK
});
const t2 = new Time({
  domain,
  tickInterval: DURATION_MONTH * 3
});

t0.getOptions().domain; // [new Date(2009, 0, 1), new Date(2009, 0, 2)]
t1.getOptions().domain; // [new Date(2008, 11, 28), new Date(2009, 0, 4)]
t2.getOptions().domain; // [new Date(2009, 0, 1), new Date(2009, 3, 1)]
```

- Nice tickMethod: The following time intervals are considered for automatic ticks.
  - 1-, 5-, 15- and 30-second.
  - 1-, 5-, 15- and 30-minute.
  - 1-, 3-, 6- and 12-hour.
  - 1- and 2-day.
  - 1-week.
  - 1- and 3-month.
  - 1-year.

```ts
import { Time,  DURATION_SECOND} from '@antv/scale';

const t0 = new Time({
  domain: [new Date(2011, 0, 1, 12, 0, 0), new Date(2011, 0, 1, 12, 0, 4)],
  tickCount: 4
})

// the priority of tickInterval is higher than tickCount
const t1 = new Time({
  domain: [new Date(2011, 0, 1, 12, 0, 0), new Date(2011, 0, 1, 12, 0, 20)],
  tickCount: 4
  tickInterval: 5 * DURATION_SECOND
})

t0.getTicks();
// [new Date(2011, 0, 1, 12, 0, 0),
//  new Date(2011, 0, 1, 12, 0, 1),
//  new Date(2011, 0, 1, 12, 0, 2),
//  new Date(2011, 0, 1, 12, 0, 3),
//  new Date(2011, 0, 1, 12, 0, 4),]

t1.getTicks();
// [new Date(2011, 0, 1, 12, 0, 0),
//  new Date(2011, 0, 1, 12, 0, 5),
//  new Date(2011, 0, 1, 12, 0, 10),
//  new Date(2011, 0, 1, 12, 0, 15),
//  new Date(2011, 0, 1, 12, 0, 20),]
```

- UTC timezone

```ts
import { Time} from '@antv/scale';

const t = new Time({
  domain: [UTC(2011, 0, 1, 12, 0, 0), UTC(2011, 0, 1, 12, 0, 4)],
  tickCount: 4,
  utc: true
})

t.getTicks(); 
// [UTC(2011, 0, 1, 12, 0, 0),
//  UTC(2011, 0, 1, 12, 0, 1),
//  UTC(2011, 0, 1, 12, 0, 2),
//  UTC(2011, 0, 1, 12, 0, 3),
//  UTC(2011, 0, 1, 12, 0, 4),]

function UTC(
  year: number,
  month: number,
  day: number = 1,
  hours: number = 0,
  minutes: number = 0,
  seconds: number = 0,
  ms: number = 0
) {
  return new Date(Date.UTC(year, month, day, hours, minutes, seconds, ms));
}
```

More usages reference [linear scale](./linear.md#usage).

## Options

| Key | Description | Type | Default|  
| ----| ----------- | -----| -------|
| domain | Sets the scale’s domain to the specified array of values. | `Date[]` | `[0, 1]` |
| range | Sets the scale’s range to the specified array of values. | `Date[]` | `[0, 1]` |
| unknown | Sets the output value of the scale for `undefined` (or `NaN`) input values. | `any` | `undefined` |
| tickCount | Sets approximately count representative values from the scale’s domain. **The specified `tickCount` in options is only a hint: the scale may return more or fewer values depending on the domain.** | `number` | `5` |
| tickInterval | Sets approximately interval representative values from the scale’s domain. **The specified `tickInterval` in options is only a hint: the scale may return more or fewer values depending on the domain. And the priority of tickInterval is higher than tickCount.**| `number` | `undefined` |
| tickMethod | Sets the method for computing representative values from the scale’s domain. | `(min: Date, max: Date, count: number, interval: number) => number[]` | `d3Time` |
| round | Rounds the output of map or invert if it is true. | `boolean` | `false` |
| clamp | Constrains the return value of map within the scale’s range if it is true. | `boolean` | `false` |
| nice | Extends the domain so that it starts and ends on nice round values if it is true. | `boolean` | `false` |
| mask | Sets format of tick value which reference [fetcha](https://github.com/taylorhakes/fecha). | `string` | `undefined` |
| utc | Takes UTC time if it is specified. | `boolean` | `false` |
| interpolate | Sets the scale’s range interpolator factory if it is specified. | `(a: number, b: number) => (t: number) => T` | `(a, b) => (t) => a * (1 - t) + b * t` |

## Methods

<a name="time_map" href="#time_map">#</a> **map**<i>(x: Date): number</i>

Given a value in the input domain, returns the corresponding value in the output range if it is not `undefined` (or `NaN`), otherwise `options.unknown`

<a name="time_invert" href="#time_invert">#</a> **invert**<i>(x: Date): number</i>

Given a value from the range, returns the corresponding value from the domain.

<a name="time_update" href="#time_update">#</a> **update**<i>(options: TimeOptions): void</i>

Updates the scale's options and rescale.

<a name="time_getOptions" href="#time_getOptions">#</a> **getOptions**<i>(): TimeOptions</i>

Returns the scale's current options.

<a name="time_clone" href="#time_clone">#</a> **clone**<i>(): Time</i>

Returns a new Time scale with the independent and same options as the original one.

<a name="time_get_ticks" href="#time_get_ticks">#</a> **getTicks**<i>(): number[]</i>

Returns representative values from the scale’s domain computed by specified `options.tickMethod` with `options.tickCount` and `options.tickInterval`.

<a name="time_get_formatter" href="#time_get_formatter">#</a> **getFormatter**<i>(): Formatter</i>

Returns nice formatter if `options.mask` is not specified otherwise custom formatter based on specified `options.mask`.
