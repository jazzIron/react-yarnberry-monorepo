import { useState, useEffect, Dispatch, SetStateAction, useCallback } from 'react';
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

type SetValue<T> = Dispatch<SetStateAction<T>>;
type Value<T> = T | null;

const localStorageRefreshState = atom({
  key: 'localStorageRefreshState',
  default: 0,
});

// json 파싱
function parseJSON<T>(value: string | null): T | undefined {
  try {
    return value === 'undefined' ? undefined : JSON.parse(value ?? '');
  } catch {
    console.warn(`parsing ERROR ===> ${value}`);
    return undefined;
  }
}

/*
 * localstorage.setitem() 동일
 * 사용 방법
 * const [isDarkTheme, setDarkTheme] = useLocalStorage('userItem', {userid:'test' , userType: 'DOCTOR'});
 * 필요시  JSON.stringify({}) 형식으로 가능
 */
export default function useLocalStorage<T>(key: string, initialValue: T): [T, SetValue<T>] {
  const { setRefresh } = useLocalStorageRefresh();
  const readValue = useCallback((): T => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? (parseJSON(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);
      return initialValue;
    }
  }, [initialValue, key]);

  const [storedValue, setStoredValue] = useState<T>(readValue);
  const setValue: SetValue<T> = useCallback(
    (value) => {
      if (typeof window == 'undefined') {
        console.warn(
          `Tried setting localStorage key “${key}” even though environment is not a client`,
        );
      }
      try {
        const newValue = value instanceof Function ? value(storedValue) : value;
        window.localStorage.setItem(key, JSON.stringify(newValue));
        setStoredValue(newValue);
        setRefresh();
        // We dispatch a custom event so every useLocalStorage hook are notified
        window.dispatchEvent(new Event('local-storage'));
      } catch (error) {
        console.warn(`Error setting localStorage key “${key}”:`, error);
      }
    },
    [key, storedValue],
  );

  useEffect(() => {
    setStoredValue(readValue());
  }, []);

  return [storedValue, setValue];
}

/**
 * localstorage.getItem()
 * 사용 방법
 * const readLocalStorageItem = useReadLocalStorage('userItem');
 */
export function useReadLocalStorage<T>(key: string): Value<T> {
  const { refreshState } = useLocalStorageRefresh();
  const readValue = useCallback((): Value<T> => {
    // 에러 처리
    if (typeof window === 'undefined') return null;
    try {
      const item = window.localStorage.getItem(key);

      return item ? (JSON.parse(item) as T) : null;
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);
      return null;
    }
  }, [key]);

  const [storedValue, setStoredValue] = useState<Value<T>>(readValue);

  useEffect(() => {
    setStoredValue(readValue());
  }, [refreshState]);

  return storedValue;
}

/**
 * Storage.removeItem()
 */
export function useRemoveLocalStorage<T>(removeKey?: string) {
  const { setRefresh } = useLocalStorageRefresh();

  const removeItem = (key: string) => {
    window.localStorage.removeItem(key);
    setRefresh();
  };

  useEffect(() => {
    if (removeKey) removeItem(removeKey);
  }, [removeKey]);

  return { removeItem };
}

/**
 * Storage.clear()
 */
export function useRemoveAllLocalStorage() {
  const { setRefresh } = useLocalStorageRefresh();

  const removeAllItem = () => {
    setRefresh();
    window.localStorage.clear();
  };
  return { removeAllItem };
}

export function useLocalStorageRefresh() {
  const [refreshState, setRefreshState] = useRecoilState(localStorageRefreshState);

  const setRefresh = () => {
    setRefreshState((prev) => prev + 1);
  };

  return {
    refreshState,
    setRefresh,
  };
}
