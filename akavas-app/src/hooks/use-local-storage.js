import { useCallback, useEffect, useSyncExternalStore } from 'react';

const dispatchStorageEvent = (key, newValue) => {
    window.dispatchEvent(new StorageEvent('storage', { key, newValue }));
}

const setLocalStorageItem = (key, value) => {
    const stringifiedValue = JSON.stringify(value);
    window.localStorage.setItem(key, stringifiedValue);
    dispatchStorageEvent(key, stringifiedValue);
};

const removeLocalStorageItem = (key) => {
    window.localStorage.removeItem(key);
    dispatchStorageEvent(key, null);
};

const getLocalStorageItem = (key) => {
    return window.localStorage.getItem(key);
};

const useLocalStorageSubscribe = (callback) => {
    window.addEventListener('storage', callback);
    return () => window.removeEventListener('storage', callback);
};

const getLocalStorageServerSnapshot = () => {
    throw Error('useLocalStorage is a client-only hook');
};

export const useLocalStorage = (key, initialValue) => {
    const getSnapshot = () => getLocalStorageItem(key);

    const store = useSyncExternalStore(
        useLocalStorageSubscribe,
        getSnapshot,
        getLocalStorageServerSnapshot
    );

    const setState = useCallback(
        (v) => {
            try {
                const nextState =
                    typeof v === 'function'
                        ? v(store ? JSON.parse(store) : initialValue)
                        : v;

                if (nextState === undefined || nextState === null) {
                    removeLocalStorageItem(key);
                } else {
                    setLocalStorageItem(key, nextState);
                }
            } catch (e) {
                console.warn(e);
            }
        },
        [key, store, initialValue]
    );

    useEffect(() => {
        if (
            getLocalStorageItem(key) === null &&
            typeof initialValue !== 'undefined'
        ) {
            setLocalStorageItem(key, initialValue);
        }
    }, [key, initialValue]);

    return [store ? JSON.parse(store) : initialValue, setState];
}

export default useLocalStorage;