import { test, expect } from 'vitest';
import { createStore } from '@flexbase/store';
import { useStoreLayout } from '../../src/index';
import { renderHook, act } from '@testing-library/react-hooks';

test('useStoreLayout hook', async () => {
  const store = await createStore<number>(options => options.default(1));

  const { result } = renderHook(() => useStoreLayout(store));

  expect(result.current[0]).toBe(1);

  await act(() => result.current[1](2));

  expect(result.current[0]).toBe(2);
});

test('useStoreLayout error', async () => {
  const key = Symbol('test');

  expect(() => useStoreLayout({ key })).toThrow(`Unable to find storage manager for ${key.toString()}`);
});
