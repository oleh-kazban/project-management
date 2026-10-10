import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { type ErrorCode, ErrorCodes } from '@pm/constants';
import { appToast } from '@pm/utils';

import App from './App.tsx';

import './index.css';

const handleGlobalError = (error: Error) => {
  try {
    const parsed = JSON.parse(error.message);
    const code = parsed.code as ErrorCode;
    const errorDetails = ErrorCodes[code];

    if (errorDetails) {
      let desc: string = errorDetails.description;
      if (parsed.meta) {
        Object.entries(parsed.meta).forEach(([key, value]) => {
          desc = desc.replace(`\${${key}}`, String(value));
        });
      }
      appToast.error(errorDetails.title, desc);
    } else {
      appToast.error('An error occurred', error.message);
    }
  } catch {
    appToast.error('An error occurred', error.message);
  }
};

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: handleGlobalError,
  }),
  mutationCache: new MutationCache({
    onError: handleGlobalError,
  }),
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
    </QueryClientProvider>
  </React.StrictMode>,
);
