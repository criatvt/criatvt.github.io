import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter, HashRouter} from 'react-router-dom';
// Self-hosted Inter (with its optical-size axis, so headlines get a display
// cut) for devices without SF Pro. Browsers only download a face they render.
import '@fontsource-variable/inter/opsz.css';
import App from './App.tsx';
import './index.css';

// A preview build (VITE_PREVIEW=1) is served from a path with no SPA fallback,
// so it routes by hash; the real site uses clean URLs.
const Router = import.meta.env.VITE_PREVIEW ? HashRouter : BrowserRouter;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>,
);
