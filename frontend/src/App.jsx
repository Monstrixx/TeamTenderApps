import React from 'react';
import AppRouter from './app/router/AppRouter';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './config';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter />
    </QueryClientProvider>
  );
}

export default App;
