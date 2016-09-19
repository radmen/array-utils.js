# array-utils.js
This package provides some simple callbacks for native Array methods (eg. `filter`, `reduce`) which I use quite often.

# List of functions

## excludeEmpty()
Removes from array falsey values.

```js
import {excludeEmpty} from '@radmen/array-utils';

const values = [0, 1, '', null];
values.filter(excludeEmpty()); // [1]
```

## replaceWith(predicate, replaceWithData)
Replaces entries from array, which match a predicate with a new value

```js
import {replaceWith} from '@radmen/array-utils';

const values = ['foo', 'bar'];
values.map(replaceWith(item => item === 'foo', 'bar')); // ['bar', 'bar'];
```

Second argument may be a callback which will provide data for replacement:

```js
values.map(replaceWith(filterByValue('foo'), item => `${item}Bar`)); // ['fooBar', 'bar'];
```

## extendWith(predicate, extendWithData)
Extends object with a given object

```js
import {extendWith} from '@radmen/array-utils'

const values = [
  {name: 'foo'},
  {name: 'bar'},
];

values.map(extendWith(item => item.name === 'foo', { active: true }); // [{name: 'foo', active: true}, {name: 'bar'}];
```

## pushToBottom(predicate)
Moves items matching predicate to end of an array.

```js
import {pushToBottom} from '@radmen/array-utils';

const values = ['foo', 'bar', 'baz'];
values.sort(pushToBottom(item => item === 'foo')); // ['bar', 'baz', 'foo'];
```

## pushToTop(predicate)
Move item matching predicate to beginning of an array

```js
import {pushToTop} from '@radmen/array-utils';

const values = ['foo', 'bar', 'baz'];
values.sort(pushToTop(item => item === 'baz')); // ['baz', 'foo', 'bar'];
```

## filterByValue(value[, secondValue[, ...]])
Filters array values by given value.

```js
import {filterByValue} from '@radmen/array-utils';

const values = ['foo', 'bar', 'baz'];
values.filter(filterByValue('foo')); // ['foo'];
```

Function accepts more then one value:

```js
values.filter(filterByValue('foo', 'bar')); // ['foo', 'bar'];
```

## filterByKeyValue(key, value[, secondValue[, ...]])
Filters array of objects by given attribute value.

```js
import {filterByKeyValue} from '@radmen/array-utils';

const values = [{name: 'foo'}, {name: 'bar'}, {name: 'baz'}];
values.filter(filterByKeyValue('name', 'bar')); // [{name: 'bar'}];
```

Function accepts more then one value:

```js
values.filter(filterByKeyValue('name', 'bar', 'foo')); // [{name: 'foo'}, {name: 'bar'}];
```

## collapse()
Collapses a collection of arrays into a flat collection.

```js
import {collapse} from '@radmen/array-utils';

const values = [[1, 2], [3, 4], [5]];
values.reduce(collapse()); // [1, 2, 3, 4, 5];
```
