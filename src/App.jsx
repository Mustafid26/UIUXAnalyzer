// import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AnalyzerPage } from './pages/AnalyzerPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AnalyzerPage />
    </QueryClientProvider>
  );
}

export default App;
