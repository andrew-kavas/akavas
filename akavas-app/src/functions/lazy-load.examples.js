/**
 * Usage Examples for lazyLoad utility
 *
 * This file demonstrates various ways to use the lazy loading functionality.
 * Copy these patterns into your own code as needed.
 */

import lazyLoad, { preloadComponent } from '#src/functions/lazy-load.js';

// ============================================================================
// BASIC USAGE
// ============================================================================

/**
 * Example 1: Basic lazy loading
 * Use this for any component that should load on demand
 */
export const BasicExample = () => {
  // Lazy load a component
  const MyComponent = lazyLoad(() => import('../components/my-component.js'));

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <MyComponent />
    </React.Suspense>
  );
};

// ============================================================================
// ROUTING EXAMPLES
// ============================================================================

/**
 * Example 2: Route-based lazy loading
 * Common pattern for single-page applications
 */
const Dashboard = lazyLoad(() => import('../components/dashboard.js'));
const Settings = lazyLoad(() => import('../components/settings.js'));
const Profile = lazyLoad(() => import('../components/profile.js'));

export const RouterExample = ({ path }) => {
  return (
    <React.Suspense fallback={<div>Loading page...</div>}>
      {path === '/dashboard' && <Dashboard />}
      {path === '/settings' && <Settings />}
      {path === '/profile' && <Profile />}
    </React.Suspense>
  );
};

// ============================================================================
// CUSTOM OPTIONS
// ============================================================================

/**
 * Example 3: Custom retry configuration
 * Use when you need more retries or different timing
 */
const HeavyComponent = lazyLoad(
  () => import('../components/heavy-component.js'),
  {
    retries: 5,        // Try 5 times instead of default 3
    retryDelay: 2000   // Wait 2 seconds between retries instead of 1
  }
);

// ============================================================================
// PRELOADING PATTERNS
// ============================================================================

/**
 * Example 4: Preload on hover
 * Improves perceived performance by loading before click
 */
export const PreloadOnHoverExample = () => {
  const handleMouseEnter = () => {
    preloadComponent(() => import('../components/heavy-component.js'));
  };

  return (
    <button onMouseEnter={handleMouseEnter}>
      Hover to preload, click to navigate
    </button>
  );
};

/**
 * Example 5: Preload on route prediction
 * Load likely next pages based on user behavior
 */
export const PredictivePreloadExample = ({ currentPage }) => {
  React.useEffect(() => {
    // If user is on page 1, preload page 2
    if (currentPage === 1) {
      preloadComponent(() => import('../components/page-2.js'));
    }

    // If user is viewing a list, preload detail view
    if (currentPage === 'list') {
      preloadComponent(() => import('../components/detail-view.js'));
    }
  }, [currentPage]);

  return <div>Current page: {currentPage}</div>;
};

/**
 * Example 6: Preload on viewport visibility
 * Load components when they're about to become visible
 */
export const PreloadOnScrollExample = () => {
  const ref = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Element is about to be visible, preload the component
          preloadComponent(() => import('../components/footer-component.js'));
        }
      });
    }, { rootMargin: '200px' }); // Trigger 200px before visible

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return <div ref={ref}>Scroll to load...</div>;
};

// ============================================================================
// CONDITIONAL LOADING
// ============================================================================

/**
 * Example 7: Load components based on user permissions
 */
export const ConditionalLoadExample = ({ userRole }) => {
  // Only import admin panel if user is admin
  const AdminPanel = userRole === 'admin'
    ? lazyLoad(() => import('../components/admin-panel.js'))
    : null;

  return (
    <div>
      {AdminPanel && (
        <React.Suspense fallback={<div>Loading admin panel...</div>}>
          <AdminPanel />
        </React.Suspense>
      )}
    </div>
  );
};

/**
 * Example 8: Load components based on feature flags
 */
export const FeatureFlagExample = ({ features }) => {
  const NewFeature = features.enableNewFeature
    ? lazyLoad(() => import('../components/new-feature.js'))
    : null;

  return NewFeature ? (
    <React.Suspense fallback={<div>Loading...</div>}>
      <NewFeature />
    </React.Suspense>
  ) : (
    <div>Feature not enabled</div>
  );
};

// ============================================================================
// MODAL/DIALOG PATTERNS
// ============================================================================

/**
 * Example 9: Lazy load modal content
 * Only load heavy modal content when modal opens
 */
export const ModalExample = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  // Only define lazy component when needed
  const ModalContent = React.useMemo(
    () => isOpen ? lazyLoad(() => import('../components/modal-content.js')) : null,
    [isOpen]
  );

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      {isOpen && ModalContent && (
        <div className="modal">
          <React.Suspense fallback={<div>Loading modal...</div>}>
            <ModalContent onClose={() => setIsOpen(false)} />
          </React.Suspense>
        </div>
      )}
    </>
  );
};

// ============================================================================
// TAB PATTERNS
// ============================================================================

/**
 * Example 10: Lazy load tab content
 * Load tabs only when they're activated
 */
const TabContent1 = lazyLoad(() => import('../components/tab-1.js'));
const TabContent2 = lazyLoad(() => import('../components/tab-2.js'));
const TabContent3 = lazyLoad(() => import('../components/tab-3.js'));

export const TabsExample = () => {
  const [activeTab, setActiveTab] = React.useState('tab1');

  // Preload adjacent tabs on hover
  const preloadTab = (tabName) => {
    if (tabName === 'tab1') {
      preloadComponent(() => import('../components/tab-1.js'));
    } else if (tabName === 'tab2') {
      preloadComponent(() => import('../components/tab-2.js'));
    } else if (tabName === 'tab3') {
      preloadComponent(() => import('../components/tab-3.js'));
    }
  };

  return (
    <div>
      <nav>
        <button
          onClick={() => setActiveTab('tab1')}
          onMouseEnter={() => preloadTab('tab1')}
        >
          Tab 1
        </button>
        <button
          onClick={() => setActiveTab('tab2')}
          onMouseEnter={() => preloadTab('tab2')}
        >
          Tab 2
        </button>
        <button
          onClick={() => setActiveTab('tab3')}
          onMouseEnter={() => preloadTab('tab3')}
        >
          Tab 3
        </button>
      </nav>

      <React.Suspense fallback={<div>Loading tab...</div>}>
        {activeTab === 'tab1' && <TabContent1 />}
        {activeTab === 'tab2' && <TabContent2 />}
        {activeTab === 'tab3' && <TabContent3 />}
      </React.Suspense>
    </div>
  );
};

// ============================================================================
// ERROR HANDLING
// ============================================================================

/**
 * Example 11: Custom error boundary with lazy loading
 */
class LazyLoadErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Lazy load error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Failed to load component</h2>
          <button onClick={() => window.location.reload()}>
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export const ErrorHandlingExample = () => {
  const RiskyComponent = lazyLoad(() => import('../components/risky.js'));

  return (
    <LazyLoadErrorBoundary>
      <React.Suspense fallback={<div>Loading...</div>}>
        <RiskyComponent />
      </React.Suspense>
    </LazyLoadErrorBoundary>
  );
};

// ============================================================================
// ADVANCED: PARALLEL LOADING
// ============================================================================

/**
 * Example 12: Load multiple components in parallel
 */
export const ParallelLoadExample = () => {
  const [showAll, setShowAll] = React.useState(false);

  React.useEffect(() => {
    if (showAll) {
      // Trigger parallel loading
      Promise.all([
        preloadComponent(() => import('../components/chart.js')),
        preloadComponent(() => import('../components/table.js')),
        preloadComponent(() => import('../components/map.js'))
      ]).then(() => {
        console.log('All components preloaded');
      });
    }
  }, [showAll]);

  const Chart = lazyLoad(() => import('../components/chart.js'));
  const Table = lazyLoad(() => import('../components/table.js'));
  const Map = lazyLoad(() => import('../components/map.js'));

  return (
    <div>
      <button onClick={() => setShowAll(true)}>Load All</button>
      {showAll && (
        <React.Suspense fallback={<div>Loading components...</div>}>
          <Chart />
          <Table />
          <Map />
        </React.Suspense>
      )}
    </div>
  );
};

// ============================================================================
// BEST PRACTICES
// ============================================================================

/**
 * TIPS:
 *
 * 1. Always wrap lazy components in Suspense
 * 2. Use meaningful fallback UI (loading spinners, skeletons)
 * 3. Preload components when user intent is clear (hover, route prediction)
 * 4. Don't lazy load components that are needed immediately
 * 5. Combine with Error Boundaries for graceful failures
 * 6. Test with slow network throttling in DevTools
 * 7. Monitor bundle sizes to ensure splitting is working
 * 8. Use route-based splitting as primary strategy
 * 9. Consider component-based splitting for heavy components
 * 10. Avoid over-splitting - too many chunks can hurt performance
 */
