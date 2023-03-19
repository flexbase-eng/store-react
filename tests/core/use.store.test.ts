import { test, expect } from 'vitest';
import { createStore } from '@flexbase/store';
import { useStore } from '../../src/index';
import { renderHook, act } from '@testing-library/react-hooks';

test('useStore hook', async () => {
  const store = createStore<number>(options => options.defaultValue(1));

  const { result } = renderHook(() => useStore(store));

  expect(result.current[0]).toBe(1);

  await act(() => result.current[1](2));

  expect(result.current[0]).toBe(2);
});

test('useStore error', async () => {
  const key = Symbol('test');

  expect(() => useStore({ key })).toThrow(`Unable to find storage manager for ${key.toString()}`);
});
