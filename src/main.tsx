import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

import './index.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Toaster position='bottom-right' />
      <App />
    </BrowserRouter>
  </StrictMode>
);
