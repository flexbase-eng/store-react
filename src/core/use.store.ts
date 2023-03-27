import { noopSubscription, SubscriptionCallback } from '@flexbase/observable-subject';
import { Setter, StorageManager, Store } from '@flexbase/store';
import { useEffect, useState } from 'react';

/**
 * A hook that attaches a store to a react state
 * Internally it uses `useState` and `useEffect` to create a subscription between the store and react state
 * @param store The store to use
 * @returns A value and function to update it
 */
export const useStore = <T>(store: Store<T>, subscribe?: SubscriptionCallback<T>): [T | undefined, Setter<T>] => {
  const mgr = StorageManager.lookupManager(store);

  if (mgr === undefined) {
    throw Error(`Unable to find storage manager for ${store.key.toString()}`);
  }

  const value = mgr.getValue(store);

  const [reactState, setReactState] = useState(value);

  const setter = mgr.getSetter(store);

  useEffect(() => {
    const subscription = mgr.subscribe(store, context => {
      setReactState(context.value);
      return Promise.resolve();
    });

    const sub = subscribe ? mgr.subscribe(store, subscribe) : noopSubscription;

    return () => {
      sub.unsubscribe();
      subscription.unsubscribe();
    };
  }, [mgr, store]);

  return [reactState, setter];
};
