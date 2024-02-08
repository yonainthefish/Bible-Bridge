import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import { AuthContextProvider } from '@/context/AuthContext.tsx';
import EditContextProvider from '@/context/EditContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthContextProvider>
    <EditContextProvider>
      <App />
    </EditContextProvider>
  </AuthContextProvider>,
);
