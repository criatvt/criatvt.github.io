import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
// Self-hosted faces: the serif with its optical-size axis, and Inter as the
// sans for devices without SF Pro. Browsers only download a face they render.
import '@fontsource-variable/source-serif-4/opsz.css';
import '@fontsource-variable/inter';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
