# Constants

There are some constants for tickInterval option used in time scale.

## Usage

<a name="DURATION_SECOND" href="#DURATION_SECOND">#</a> **DURATION_SECOND**: The number of milliseconds for one second.

```ts
import { Time, DURATION_SECOND } from '@antv/scale';

DURATION_SECOND; // 1000

const x = new Time({
  tickInterval: DURATION_SECOND
  domain: [new Date(2011, 0, 1, 12, 0, 0), new Date(2011, 0, 1, 12, 0, 4)]
})
x.getTicks();
//[new Date(2011, 0, 1, 12, 0, 0),
// new Date(2011, 0, 1, 12, 0, 1),
// new Date(2011, 0, 1, 12, 0, 2),
// new Date(2011, 0, 1, 12, 0, 3),
// new Date(2011, 0, 1, 12, 0, 4),]
```

<a name="DURATION_MINUTE" href="#DURATION_MINUTE">#</a> **DURATION_MINUTE**: The number of milliseconds for one minute.

```ts
import { Time, DURATION_MINUTE } from '@antv/scale';

DURATION_MINUTE; // 6000 

const x = new Time({
  tickInterval: DURATION_MINUTE
  domain: [new Date(2011, 0, 1, 12, 0, 27), new Date(2011, 0, 1, 12, 4, 12)]
})
x.getTicks();
// [new Date(2011, 0, 1, 12, 1),
// new Date(2011, 0, 1, 12, 2),
// new Date(2011, 0, 1, 12, 3),
// new Date(2011, 0, 1, 12, 4)]
```

<a name="DURATION_HOUR" href="#DURATION_HOUR">#</a> **DURATION_HOUR**: The number of milliseconds for one hour.

```ts
import { Time, DURATION_HOUR } from '@antv/scale';

DURATION_HOUR; // 3600000

const x = new Time({
  tickInterval: DURATION_HOUR
  domain: [new Date(2011, 0, 1, 12, 28, 27), new Date(2011, 0, 1, 16, 34, 12)]
})
x.getTicks();
// [new Date(2011, 0, 1, 13, 0),
// new Date(2011, 0, 1, 14, 0),
// new Date(2011, 0, 1, 15, 0),
// new Date(2011, 0, 1, 16, 0),]
```

<a name="DURATION_DAY" href="#DURATION_DAY">#</a> **DURATION_DA**: The number of milliseconds for one day.

```ts
import { Time, DURATION_DAY } from '@antv/scale';

DURATION_DAY; // 86400000

const x = new Time({
  tickInterval: DURATION_DAY
  domain: [new Date(2011, 0, 1, 16, 28, 27), new Date(2011, 0, 5, 21, 34, 12)]
})
x.getTicks();
// [new Date(2011, 0, 3, 0, 0),
// new Date(2011, 0, 5, 0, 0),
// new Date(2011, 0, 7, 0, 0),
// new Date(2011, 0, 9, 0, 0),]
```

<a name="DURATION_WEEK" href="#DURATION_WEEK">#</a> **DURATION_WEEK**: The number of milliseconds for one week.

```ts
import { Time, DURATION_WEEK } from '@antv/scale';

DURATION_WEEK; // 604800000

const x = new Time({
  tickInterval: DURATION_WEEK
  domain: [new Date(2011, 0, 1, 16, 28, 27), new Date(2011, 0, 23, 21, 34, 12)]
})
x.getTicks();
// [new Date(2011, 0, 2, 0, 0),
// new Date(2011, 0, 9, 0, 0),
// new Date(2011, 0, 16, 0, 0),
// new Date(2011, 0, 23, 0, 0),]
```

<a name="DURATION_MONTH" href="#DURATION_MONTH">#</a> **DURATION_MONTH**: The number of milliseconds for one month(30 days).

```ts
import { Time, DURATION_MONTH } from '@antv/scale';

DURATION_MONTH; // 18144000000

const x = new Time({
  tickInterval: DURATION_MONTH
  domain: [new Date(2011, 0, 18), new Date(2011, 4, 2)]
})
x.getTicks();
// [new Date(2011, 1, 1, 0, 0),
// new Date(2011, 2, 1, 0, 0),
// new Date(2011, 3, 1, 0, 0),
// new Date(2011, 4, 1, 0, 0),]
```

<a name="DURATION_YEAR" href="#DURATION_YEAR">#</a> **DURATION_YEAR**: The number of milliseconds for one year(365 days).

```ts
import { Time, DURATION_YEAR } from '@antv/scale';

DURATION_YEAR; // 31536000000

const x = new Time({
  tickInterval: DURATION_YEAR
  domain: [new Date(2010, 11, 18), new Date(2014, 2, 2))]
})
x.getTicks();
// [new Date(2011, 0, 1, 0, 0),
// new Date(2012, 0, 1, 0, 0),
// new Date(2013, 0, 1, 0, 0),
// new Date(2014, 0, 1, 0, 0),]
```
