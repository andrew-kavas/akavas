import { Suspense } from 'react';

import reactLogo from '#src/assets/react.svg';
import Test from '#src/components/test.js';
import lazyLoad, { preloadComponent } from '#src/functions/lazy-load.js';
import history, { useHistory } from '#src/constants/history.js';

import '#src/App.css';

const ProjectA = lazyLoad(() => import('#src/components/project-a.js'));
const ProjectB = lazyLoad(() => import('#src/components/project-b.js'));

const Header = () => (
  <div className='flex flex-row justify-center'>
    <a href='https://react.dev' target='_blank' rel='noreferrer'>
      <img src={reactLogo} className='logo react' alt='React logo' />
    </a>
  </div>
);

const Footer = () => (
  <div className='flex flex-row justify-center'>
    <a href='https://react.dev' target='_blank' rel='noreferrer'>
      <img src={reactLogo} className='logo react' alt='React logo' />
      <div>Link to my GitHub</div>
    </a>
  </div>
);

const PageLayout = ({ title, children }) => (
  <div className='p-8 bg-white shadow-xl rounded-2xl w-full'>
    <h2 className='text-4xl font-extrabold text-indigo-700 mb-6 border-b pb-2'>
      {title}
    </h2>
    {children}
  </div>
);

const Home = () => (
  <PageLayout title='Home Dashboard'>
    <p className='text-lg text-gray-700'>
      Welcome! Navigate to a project to see the routing in action.
    </p>
  </PageLayout>
);

const Router = ({ path }) => {
  if (path.startsWith('/project-a')) return <ProjectA />;

  if (path.startsWith('/project-b')) return <ProjectB />;

  return <Home />;
};

const NavItem = ({
  to,
  label,
  onHover = () => { },
  path
}) => (
  <button
    onClick={() => history.push(to)}
    onMouseEnter={onHover || undefined}
    className={`
      px-6 py-2 mx-2 rounded-lg font-semibold transition duration-150 ease-in-out
        ${path.startsWith(to) || (to === '/' && path === '/')
        ? 'bg-indigo-600 text-white shadow-md'
        : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
      }
    `}
  >
    {label}
  </button>
);

const App = () => {

  console.log(history);
  const { path } = useHistory();

  return (
    <div className='min-h-screen bg-gray-50 p-6 font-[Inter]'>
      <Header />
      <Test testParam1={'ok'} />

      <Footer />
      <header className='text-center mb-10'>
        <h1 className='text-5xl font-extrabold text-gray-800 mb-2'>
          Custom Routing Example
        </h1>
        <p className='text-gray-500'>
          Using `history` for path management.
        </p>
      </header>

      {/* Navigation Links */}
      <nav className='flex justify-center mb-12'>
        <NavItem to='/' label='Home' path={path} />
        <NavItem
          to='/project-a'
          label='Project A'
          onHover={() => {
            preloadComponent(() => import('#src/components/project-a.js'))
          }}
          path={path}
        />
        <NavItem
          to='/project-b'
          label='Project B'
          onHover={() => {
            preloadComponent(() => import('#src/components/project-b.js'))
          }}
          path={path}
        />
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
