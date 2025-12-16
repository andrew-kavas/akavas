import { useCallback, useEffect, useState } from 'react';

const { window } = globalThis;

export default () => {
  // Initialize state with the current browser path
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
    /**
     * Handles 'popstate' events (when user clicks browser back/forward
     * buttons). We update the path state to match the new URL.
     */
    const handlePopState = () => {
      // Use pathname and not the full href
      setPath(window.location.pathname);
    };

    // Attach the event listener when the component mounts
    window.addEventListener('popstate', handlePopState);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []); // Run only once on mount

  // Return the current path and the navigation control functions
  return { path, push, replace };
};
