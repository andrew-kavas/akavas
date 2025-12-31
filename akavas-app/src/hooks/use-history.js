import { useCallback, useEffect, useState } from 'react';

const { window } = globalThis;

// --- 1. Custom History Hook ---

/**
 * Custom React Hook to manage browser history (URL path) using the native
 * History API. This is the idiomatic name used for routing context.
 */
const useHistory = () => {
  const [path, setPath] = useState(window.location.pathname);

  // Function to change the URL and push a new history entry
  const push = useCallback(newPath => {
    window.history.pushState({}, '', newPath);
    setPath(newPath);
  }, []);

  // Function to change the URL and replace the current history entry
  const replace = useCallback(newPath => {
    window.history.replaceState({}, '', newPath);
    setPath(newPath);
  }, []);

  useEffect(() => {
    // Event listener to synchronize React state with browser navigation (Back/Forward buttons)
    const handlePopState = () => {
      setPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return { path, push, replace };
};

export default useHistory;


