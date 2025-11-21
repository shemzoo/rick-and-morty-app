import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { store } from './stores/store';

import './index.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter
        basename={import.meta.env.PROD ? '/rick-and-morty-app' : '/'}
      >
        <Toaster position='bottom-right' />
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
