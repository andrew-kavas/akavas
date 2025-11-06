import reactLogo from '#src/assets/react.svg';
import Test from '#src/components/test.jsx';

import '#src/App.css';

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

const App = () => (
  <>
    <Header />
    <Test testParam1={'ok'} />
    <Test testParam1='ok' testError={true} />
    <Footer />
  </>
);

export default App;
