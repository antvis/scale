# Linear

A basic continuous scale that preserve proportional differences for continuous data. Each range value y can be expressed as a function of the domain value x: `y = mx + b`. ([online demo](https://observablehq.com/@pearmini/antv-scale#linear))

## Usage

- Basic usage

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

- Nice domain
  
```ts
import { Linear } from '@antv/scale';

const x = new Linear({
  domain: [0.1, 0.9]
});
x.getOptions().domain // [0.1, 0.9]

x.update({
  nice: true
})
x.getOptions().domain; // [0, 1]
```

- Round output
  
```ts
import { Linear } from '@antv/scale';

const x = new Linear({
  range: [0.1, 0.9]
});

x.map(0) // 0.1
x.map(1) // 0.9

x.update({
  round: true
})
x.map(0) // 0
x.map(1) // 1
```

- Clamp output

```ts
import { Linear } from '@antv/scale';

const x = new Linear();
x.map(-1) // -1
x.map(2) // 2

x.update({
  clamp: true
})
x.map(-1) // 0
x.map(2) // 1
```

- Customize range interpolator
  
```ts
import { Linear } from '@antv/scale';

const x = new Linear({
  domain: [0, 100],
  range: [0, 10],
});

x.map(4); // 0.4
x.map(36); // 3.6
x.map(64); // 6.4

/*
* y^2 = mx^2 + b
* Input value corresponds linearly to the squared output value.
* It is useful if input value corresponds to the area of a graphical mark and the mark is specified by radius.
*/

x.update({
  interpolate: (a: number, b: number) => (t: number) => Math.sqrt(a * a * (1 - t) + b * b * t)
});

x.map(4); // 2: 4 = 2 * 2
x.map(36); // 6: 36 = 6 * 6
x.map(64); // 8: 64 = 8 * 8
```
  
- Customize tickMethod
  
```ts
import { Linear, LinearOptions, rPretty, wilkinsonExtended } from '@antv/scale';

const options: LinearOptions = {
  domain: [2, 17],
  tickCount: 6,
};

const x0 = new Linear(options); // default tickMethod is d3Ticks
const x1 = new Linear({
  tickMethod: rPretty
});
const x2 = new Linear({
  tickMethod: wilkinsonExtended
});
const x3 = new Linear({
  tickMethod: (min: number, max: number, count: number) => {
    const step = (max - min) / count;
    return new Array(count).fill(0).map((_, i) => min + i * step);
  }
});

x0.getTicks(); // [2, 4, 6, 8, 10, 12, 14, 16]
x1.getTicks(); // [2, 4, 6, 8, 10, 12, 14, 16, 18]
x2.getTicks(); // [0, 2.5, 5, 7.5, 10, 12.5, 15, 17.5]
x3.getTicks(); // [2, 4.5, 7, 9.5, 12, 14.5]
```

## Options

| Key | Description | Type | Default|  
| ----| ----------- | -----| -------|
| domain | Sets the scale’s domain to the specified array of values. | `number[]` | `[0, 1]` |
| range | Sets the scale’s range to the specified array of values. | `number[]` | `[0, 1]` |
| unknown | Sets the output value of the scale for `undefined` (or `NaN`) input values. | `any` | `undefined` |
| tickCount | Sets approximately count representative values from the scale’s domain. **The specified `tickCount` in options is only a hint: the scale may return more or fewer values depending on the domain.**| `number` | `5` |
| tickMethod | Sets the method for computing representative values from the scale’s domain. | `(min: number, max: number, count: number) => number[]` | `d3-ticks` |
| round | Rounds the output of map or invert if it is true. | `boolean` | `false` |
| clamp | Constrains the return value of map within the scale’s range if it is true. | `boolean` | `false` |
| nice | Extends the domain so that it starts and ends on nice round values if it is true. | `boolean` | `false` |
| interpolate | Sets the scale’s range interpolator factory if it is specified. | `(a: number, b: number) => (t: number) => T` | `(a, b) => (t) => a * (1 - t) + b * t` |

## Methods

<a name="linear_map" href="#linear_map">#</a> **map**<i>(x: number): number</i>

Given a value in the input domain, returns the corresponding value in the output range if it is not `undefined` (or `NaN`), otherwise `options.unknown`

<a name="linear_invert" href="#linear_invert">#</a> **invert**<i>(x: number): number</i>

Given a value from the range, returns the corresponding value from the domain.

<a name="linear_update" href="#linear_update">#</a> **update**<i>(options: LinearOptions): void</i>

Updates the scale's options and rescale.

<a name="linear_get_options" href="#linear_get_options">#</a> **getOptions**<i>(): LinearOptions</i>

Returns the scale's current options.

<a name="linear_clone" href="#linear_clone">#</a> **clone**<i>(): Linear</i>

Returns a new Linear scale with the independent and same options as the original one.

<a name="linear_get_ticks" href="#linear_get_ticks">#</a> **getTicks**<i>(): number[]</i>

Returns representative values from the scale’s domain computed by specified `options.tickMethod` with `options.tickCount`.
