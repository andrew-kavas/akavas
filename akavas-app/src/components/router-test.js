import React, { Suspense, useCallback, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

import useHistory from '#src/hooks/use-history.js';

const { document, window } = globalThis;

// --- Utility Component for Layouts ---
const PageLayout = ({ title, children }) => (
  <div className='p-8 bg-white shadow-xl rounded-2xl w-full'>
    <h2 className='text-4xl font-extrabold text-indigo-700 mb-6 border-b pb-2'>
      {title}
    </h2>
    {children}
  </div>
);

// --- 2. Page Components ---
// These are the actual components rendered by the Router.

const Home = () => (
  <PageLayout title='Home Dashboard'>
    <p className='text-lg text-gray-700'>
      Welcome! Navigate to a project to see the routing in action.
    </p>
  </PageLayout>
);

const ProjectA = () => (
  <PageLayout title='Project A - Advanced Data Viz'>
    <p className='text-lg mb-4 text-gray-700'>
      This demonstrates content specific to Project A.
    </p>
    <div className='bg-green-100 p-4 rounded-lg text-green-800 font-semibold'>
      Use Case: This could have been a lazy-loaded component in a multi-file
      project.
    </div>
  </PageLayout>
);

const ProjectB = () => (
  <PageLayout title='Project B - Complex Form Handler'>
    <p className='text-lg mb-4 text-gray-700'>
      This demonstrates content specific to Project B.
    </p>
    <div className='bg-yellow-100 p-4 rounded-lg text-yellow-800 font-semibold'>
      Use Case: This could have been a lazy-loaded component in a multi-file
      project.
    </div>
  </PageLayout>
);

// --- 3. The Router Component (Core Logic) ---

const Router = ({ path }) => {
  // Use the path state from the useHistory hook to determine which component to render
  if (path.startsWith('/project-a')) {
    return <ProjectA />;
  }
  if (path.startsWith('/project-b')) {
    return <ProjectB />;
  }
  // Default route
  return <Home />;
};

// --- 4. Main Application ---

const App = () => {
  // Get the core navigation tools from the idiomatic hook name
  const { path, push } = useHistory();

  // Load Tailwind on mount
  // useEffect(() => {
  //   loadTailwind();
  // }, []);

  const NavItem = ({ to, label }) => (
    <button
      onClick={() => push(to)}
      className={`
        px-6 py-2 mx-2 rounded-lg font-semibold transition duration-150 ease-in-out
        ${
          path.startsWith(to) || (to === '/' && path === '/')
            ? 'bg-indigo-600 text-white shadow-md'
            : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
        }
      `}
    >
      {label}
    </button>
  );

  return (
    <div className='min-h-screen bg-gray-50 p-6 font-[Inter]'>
      <header className='text-center mb-10'>
        <h1 className='text-5xl font-extrabold text-gray-800 mb-2'>
          Custom Routing Example
        </h1>
        <p className='text-gray-500'>
          Using `useHistory()` for path management.
        </p>
      </header>

      {/* Navigation Links */}
      <nav className='flex justify-center mb-12'>
        <NavItem to='/' label='Home' />
        <NavItem to='/project-a' label='Project A' />
        <NavItem to='/project-b' label='Project B' />
      </nav>

      {/* Main Content Area: Suspense wraps the Router */}
      <main className='max-w-5xl mx-auto'>
        {/* Suspense is still used here, but the fallback will resolve instantly
            since the components are loaded in the main bundle. */}
        <Suspense
          fallback={
            <PageLayout title='Loading...'>
              <div className='text-center text-xl text-gray-500 animate-pulse'>
                Loading content...
              </div>
            </PageLayout>
          }
        >
          <Router path={path} />
        </Suspense>

        <div className='mt-8 pt-6 text-center border-t border-gray-200 text-sm font-mono text-gray-500'>
          Current Path: {path}
        </div>
      </main>
    </div>
  );
};

export default App;
// The necessary ReactDOM setup for the canvas environment
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
