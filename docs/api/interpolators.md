# Interpolators

Built-in interpolator factories for continuous scale.

## Usage

<a name="createInterpolateNumber" href="#createInterpolateNumber">#</a> **createInterpolateNumber**<i>(a: number, b: number) => Interpolate</i>

The default interpolate factory for continuous scales which returns a number interpolator.

```ts
import { Linear, createInterpolateNumber } from '@antv/scale';

const x = new Linear({ interpolate: createInterpolateNumber });

x.map(0.5); // 0.5;

createInterpolateNumber(0, 1)(0.5); // 0.5;
```

<a name="createInterpolateColor" href="#createInterpolateColor">#</a> **createInterpolateColor**<i>(a: string, b: string) => Interpolate</i>

The css color interpolate factory for continuous scales which returns a color interpolator.

```ts
import { Linear, createInterpolateColor } from '@antv/scale';

const x = new Linear({
  interpolate: createInterpolateColor,
  range: ['red', 'blue'],
});

x.map(0.5); // rgba(127.5, 0, 127.5, 1);

createInterpolateNumber('red', 'blue')(0.5); // rgba(127.5, 0, 127.5, 1);
```

<a name="createInterpolateNumber" href="#createInterpolateNumber">#</a> **createInterpolateNumber**<i>(a: number, b: number) => Interpolate</i>

The value interpolate factory which can interpolate numbers and colors depending on input type.

```ts
import { Linear, createInterpolateValue } from '@antv/scale';

const x = new Linear({
  interpolate: createInterpolateValue,
});

x.map(0.5); // 0.5;
createInterpolateValue(0, 1)(0.5); // 0.5;

x.update({
  range: ['hsl(0, 100%, 50%)', 'hsl(240, 100%, 50%)'],
});

x.map(0.5); // rgba(127.5, 0, 127.5, 1)
createInterpolateValue('hsl(0, 100%, 50%)', 'hsl(240, 100%, 50%)')(0.5); // 0.5;
```
