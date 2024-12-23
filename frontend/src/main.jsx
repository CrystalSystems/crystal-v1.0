import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { store } from "./redux/store";
import './i18n';
import { ScrollToTop } from "./components/ScrollToTop";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
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

 