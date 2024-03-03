import ReactDOM from 'react-dom/client';
import App from '@/App.tsx';
import '@/index.css';

import { AuthContextProvider } from '@/context/AuthContext.tsx';
import EditContextProvider from '@/context/EditContext.tsx';
import PageContextProvider from '@/context/PageContext.tsx';
import UploadContextProvider from '@/context/UploadContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthContextProvider>
    <UploadContextProvider>
      <EditContextProvider>
        <PageContextProvider>
          <App />
        </PageContextProvider>
      </EditContextProvider>
    </UploadContextProvider>
  </AuthContextProvider>,
);
