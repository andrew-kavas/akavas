import { Component, Suspense } from 'react';

import LoadingArea from '#src/components/loading-area.js';
import reportError from '#src/functions/report-error.js';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /** @type {Error | null} */
      error: null,
      isLoading: false
    };
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  static getDerivedStateFromError(error) {
    // Set the error object here so it's ready for render()
    return { error: error, isLoading: false };
  }

  async componentDidCatch(error) {
    // ... (logging and isMounted check) ...
    reportError(error);
    // Note: No need for this.setState here if GDSFE sets the state.
  }

  render() {
    const { error, isLoading } = this.state;

    if (isLoading) return <LoadingArea />;

    if (error) {
      // FIX: Instead of rendering the Error object directly,
      // render the error.message property.
      return <div>{error.message}</div>;
    }

    return this.props.children;
  }

}

const Boundary = ({ children }) => (
  <ErrorBoundary>
    <Suspense fallback={<LoadingArea />}>{children}</Suspense>
  </ErrorBoundary>
);

export default Boundary;
