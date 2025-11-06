import { Component, Suspense } from 'react';

import LoadingArea from '#src/components/loading-area.js';
import reportError from '#src/functions/report-error.js';

// const { console } = globalThis;

class ErrorBoundary extends Component {
  constructor(...args) {
    super(...args);
    this.state = { error: null, isLoading: false };
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
  // static getDerivedStateFromError() {
  //   return { isLoading: true };
  // }

  async componentDidCatch(error) {
    // ... (logging and isMounted check) ...
    reportError(error);
    // Note: No need for this.setState here if GDSFE sets the state.
  }
  // async componentDidCatch(error) {
  //   if (!this._isMounted) {
  //     console.log('isMounted');
  //     return;
  //   }

  //   error ??= new Error('Unknown Error');

  //   reportError(error);

  //   this.setState({ error, isLoading: false });
  // }

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
  // render() {
  //   const { error, isLoading } = this.state;

  //   if (isLoading) return <LoadingArea />;

  //   if (error) {
  //     return <div>{error}</div>;
  //   }

  //   return this.props.children;
  // }
}

const Boundary = ({ children }) => (
  <ErrorBoundary>
    <Suspense fallback={<LoadingArea />}>{children}</Suspense>
  </ErrorBoundary>
);

export default Boundary;
