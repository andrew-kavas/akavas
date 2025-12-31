import { lazy } from 'react';

const { console, setTimeout } = globalThis;

/**
 * Enhanced lazy loading utility for React components with retry logic
 *
 * @example
 *   const MyComponent = lazyLoad(() => import('./MyComponent'));
 *
 * @example
 *   const MyComponent = lazyLoad(() => import('./MyComponent'), {
 *     retries: 5,
 *     retryDelay: 2000
 *   });
 *
 * @param {Function} importFunc - Dynamic import function (e.g., () =>
 *   import('./Component'))
 * @param {Object} options - Configuration options
 * @param {number} [options.retries] - Number of retry attempts (default: 3)
 * @param {number} [options.retryDelay] - Delay between retries in ms (default:
 *   1000)
 * @returns {React.LazyExoticComponent} Lazy-loaded component
 */
export const lazyLoad = (importFunc, options = {}) => {
  const { retries = 3, retryDelay = 1000 } = options;

  return lazy(() => {
    return new Promise((resolve, reject) => {
      let attemptCount = 0;

      const attemptImport = () => {
        attemptCount++;

        importFunc()
          .then(resolve)
          .catch(error => {
            if (attemptCount < retries) {
              console.warn(
                `Failed to load component (attempt ${attemptCount}/${retries}). Retrying in ${retryDelay}ms...`,
                error
              );

              setTimeout(attemptImport, retryDelay);
            } else {
              console.error(
                `Failed to load component after ${retries} attempts:`,
                error
              );
              reject(error);
            }
          });
      };

      attemptImport();
    });
  });
};

/**
 * Preload a lazy-loaded component Useful for prefetching components before
 * they're needed
 *
 * @example
 *   const ProjectA = lazyLoad(() => import('./components/project-a'));
 *
 *   // Preload on hover or route change prediction
 *   preloadComponent(() => import('./components/project-a'));
 *
 * @param {Function} importFunc - Dynamic import function
 * @returns {Promise} Promise that resolves when component is loaded
 */
export const preloadComponent = importFunc => {
  return importFunc().catch(error => {
    console.error('Failed to preload component:', error);
  });
};

export default lazyLoad;
