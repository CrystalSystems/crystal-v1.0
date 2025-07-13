import App from './App';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { store } from './store';
import './i18n';
import { ScrollToTop } from '../shared/ui/ScrollToTop';

import '../shared/styles/index.css';

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById("root")).render(
 <BrowserRouter>
{/* Scroll up when going to page */}
 <ScrollToTop />
{/* /Scroll up when going to page */}
 <Provider store={store}>
 <QueryClientProvider client={queryClient}> 
  <App />
  </QueryClientProvider>
  </Provider>
  </BrowserRouter>
 ); 

 