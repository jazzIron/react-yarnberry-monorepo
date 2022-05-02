import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalStyle } from '@common/styles';

ReactDOM.render(
  <StrictMode>
    <GlobalStyle />
    <App />
    <ToastContainer />
  </StrictMode>,
  document.getElementById('root'),
);
