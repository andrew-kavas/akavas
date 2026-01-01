import { useCallback, useEffect, useRef } from 'react';

/**
 * @template {(...args: any[]) => any} T
 * @param {T} fn
 */
const useEvent = fn => {
  const ref = useRef(fn);

  useEffect(() => {
    ref.current = fn;
  }, [fn]);

  return useCallback(/** @type {T} */((...args) => ref.current(...args)), []);
};

export default useEvent;
