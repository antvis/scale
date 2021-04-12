# Category

Category scales have discrete domain and range.

## Usage

```ts
import { Category, CategoryOptions } from '@antv/scale';

const options: CategoryOptions = {
  domain: ['A', 'B', 'C'],
  range: ['a', 'b', 'c'],
  unknown: 'hello world'
};

const x = new Category(options);

x.map('A'); // a
x.map(undefined); // 'hello world'
x.map('B'); // b
x.map('C'); // c
```

## Options

| Key | Description | Type | Default|  
| ----| ----------- | -----| -------|
| domain | Sets the scale’s domain to the specified array of values. | `number[]` or `string[]` | `[]` |
| range | Sets the scale’s range to the specified array of values. | `number[]` or `string[]` | `[]` |
| unknown | Sets the output value of the scale for `undefined` (or `NaN`) input values. | `any` | `undefined` |
| formatter | Sets the format function to display a output value. | `(x: any) => string` | ```(x) => `${x}```|

## Methods

<a name="category_map" href="#category_map">#</a> **map**<i>(x: number[] or string[]): number[] or string[]</i>

Returns the input value itself if it is not `undefined` (or `NaN`), otherwise `options.unknown`.

<a name="category_invert" href="#category_invert">#</a> **invert**<i>(x: x: number[] or string[]): x: number[] or string[]</i>

Returns the output value itself.

<a name="category_update" href="#category_update">#</a> **update**<i>(options: CategoryOptions): void</i>

Update the scale's options and rescale.

<a name="category_getOptions" href="#category_getOptions">#</a> **getOptions**<i>(): CategoryOptions</i>

Returns the scale's current options.

<a name="category_clone" href="#category_clone">#</a> **clone**<i>(): Category</i>

Returns a new Category scale with the independent and same options as the original one.
