import { useSyncExternalStore } from 'react';

import paveShim from '#src/constants/pave-shim.js';
import getNewerVersion from '#src/functions/get-newer-version.js';

import decodeQuery from '#src/functions/decode-query.js';

const { mergeRefs } = paveShim;
const { history, location, URL, window } = globalThis;

const beforeListeners = new Set();
const listeners = new Set();

const getCurrent = ({ action, state, url }) => ({
  action,
  hash: url.hash,
  path: url.pathname,
  query: decodeQuery(url.search),
  state,
  url: `${url.pathname}${url.search}${url.hash}`
});

const loadTypes = { pop: 'reload', push: 'assign', replace: 'replace' };

const execute = ({ action, state, url }) => {
  const previous = obj.current;
  const next = mergeRefs(getCurrent({ action, state, url }), previous);
  if (next.url === previous.url) return;

  for (const { allowChange } of beforeListeners) {
    if (allowChange({ previous, next })) continue;

    if (action === 'pop') history.pushState(previous.state, '', previous.url);
    return;
  }

  if (getNewerVersion.fetched) {
    return location[loadTypes[next.action]](next.url);
  }

  obj.current = next;
  if (action !== 'pop') history[`${action}State`](state, '', next.url);
  listeners.forEach(({ onChange }) => {
    if (obj.current === next) onChange(next);
  });
};

window.addEventListener('popstate', ({ state }) =>
  execute({ action: 'pop', state, url: location })
);

const obj = {
  current: getCurrent({ action: 'load', state: undefined, url: location }),

  push: (url, state) =>
    execute({ action: 'push', state, url: new URL(url, location.href) }),

  replace: (url, state) =>
    execute({ action: 'replace', state, url: new URL(url, location.href) }),

  onChange: onChange => {
    const listener = { onChange };
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },

  beforeChange: allowChange => {
    const beforeListener = { allowChange };
    beforeListeners.add(beforeListener);
    return () => {
      beforeListeners.delete(beforeListener);
    };
  }
};

export const useHistory = () => useSyncExternalStore(obj.onChange, () => obj.current);

export default obj;
