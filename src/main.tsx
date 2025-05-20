// main.ts 또는 index.tsx
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { worker } from './mocks/browser.ts';
import { ErrorContextProvider } from './contexts/ErrorContext.tsx';
import './index.css';

worker
  .start({
    onUnhandledRequest: 'bypass'
  })
  .then(() => {
    createRoot(document.getElementById('root')!).render(
      <ErrorContextProvider>
        <App />
      </ErrorContextProvider>
    );
  });
