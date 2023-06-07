import { Setter, StorageManager, Store } from '@flexbase/store';
import { useLayoutEffect, useState } from 'react';

/**
 * A hook that attaches a store to a react state.
 * Internally it uses `useState` and `useLayoutEffect` to create a subscription between the store and react state
 * @param store The store to use
 * @returns A value and function to update it
 */
export const useStoreLayout = <T>(store: Store<T>): [T, Setter<T>] => {
  const mgr = StorageManager.lookupManager(store);

  if (mgr === undefined) {
    throw Error(`Unable to find storage manager for ${store.key.toString()}`);
  }

  const value = mgr.getValue(store);

  const [reactState, setReactState] = useState(value);

  const setter = mgr.getSetter(store);

  useLayoutEffect(() => {
    const subscription = mgr.subscribe(store, context => {
      setReactState(context.value);
      return Promise.resolve();
    });

    return () => subscription.unsubscribe();
  }, [mgr, store]);

  return [reactState, setter];
};
