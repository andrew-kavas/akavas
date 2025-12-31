import React from 'react';
import ReactDOM from 'react-dom/client';

import App from '#src/App.js';
import Boundary from '#src/components/boundary.js';
import '#src/index.css';

const { document } = globalThis;

// @ts-expect-error: window.document could be null
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Boundary>
      <App />
    </Boundary>
  </React.StrictMode>
);
