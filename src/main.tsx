import * as ReactDOM from 'react-dom/client';
import { App } from './app/app';
import './index.css';
import { GlobalContextProvider } from './app/context/context';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <GlobalContextProvider>
    <App />
  </GlobalContextProvider>
);
