import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  <StrictMode>
    <App />
    <ToastContainer />
  </StrictMode>,
  document.getElementById('root'),
);
