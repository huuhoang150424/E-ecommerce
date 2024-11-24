import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.scss';
import { store,persistor } from '@/redux/store'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PersistGate } from 'redux-persist/integration/react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000, 
      gcTime: 300000, 
      refetchOnWindowFocus: false
    },
  },
});
createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </QueryClientProvider>
  </Provider>
);
