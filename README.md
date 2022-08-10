# store-react

[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=flexbase-eng_store-react&metric=coverage)](https://sonarcloud.io/summary/new_code?id=flexbase-eng_store-react) [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=flexbase-eng_store-react&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=flexbase-eng_store-react)

## Installation

`npm install @flexbase/observable-subject`

or

`yarn add @flexbase/observable-subject`

## Usage

### useStore

integrates [useState](https://reactjs.org/docs/hooks-reference.html#usestate) with [flexbase store](https://github.com/flexbase-eng/store)

```ts
import { useStore } from '@flexbase/store-react';

export const component = () => {
  const [value, setValue] = useStore(store);

  return (
    <div>
      <p>You clicked {value} times</p>
      <button onClick={() => setValue(count + 1)}>Click me</button>
    </div>
  );
};
```

### useStoreLayout

integrates [useLayoutEffect](https://reactjs.org/docs/hooks-reference.html#uselayouteffect) with [flexbase store](https://github.com/flexbase-eng/store)

```ts
import { useStoreLayout } from '@flexbase/store-react';

export const component = () => {
  const [value, setValue] = useStoreLayout(store);

  return (
    <div>
      <p>You clicked {value} times</p>
      <button onClick={() => setValue(count + 1)}>Click me</button>
    </div>
  );
};
```
