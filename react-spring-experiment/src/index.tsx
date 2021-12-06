import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import ReactDOM from 'react-dom';
import App from './App';
import GlobalStyle from './styles/global';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    <GlobalStyle />
  </React.StrictMode>,
  document.getElementById('root')
);
