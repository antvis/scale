# Identity

Identity scales are a special case of linear scales where the domain and range are identical.

## Example

```ts
import { Identity, IdentityOptions } from '@antv/scale';

const options: IdentityOptions = {
  unknown: 'dirty',
  domain: [0, 10],
};

const x = new Identity(options);

x.map(1); // 1
x.map(undefined); // 'dirty'
x.invert(2); // 2
x.getTicks(); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

## Options

| name | type | default | description |
| ---- | ---- | ------- | ----------- |
| domain | `number[]` | `[0, 1`] |Sets the scale’s domain to the specified array of values. |
| range | `number[]` | `[0, 1]` |Sets the scale’s range to the specified array of values. |
| unknown | `any` | `undefined` |Sets the output value of the scale for undefined (or NaN) input values. |
| formatter | `(x: any) => string` | ```(x) => `${x}```|Sets the format function to display a tick value. |
| tickCount | `number` | `5` |Sets approximately count representative values from the scale’s domain. |
| tickMethod | `(options?: IdentityOptions) => number[]` | r-pretty|Sets the method for computing representative values from the scale’s domain.|

## Methods

- `map(x: number): number | any`: Returns the input value itself if it is not undefined (or NaN), otherwise `options.unknown`.
- `invert(x: number)`: Returns the output value itself.
- `getTicks()`: Returns representative values from the scale’s domain computed by specified `options.tickMethod` with `options.tickCount`.
- `update(options: Partial<IdentityOptions>)`: Update the scale's options and rescale.
- `getOptions(): IdentityOptions`: Returns the scale's current options.
- `clone(): Identity`: Return a new identity scale with the independent and same options as the original one.
