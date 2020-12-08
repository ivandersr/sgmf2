import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ModalProvider } from 'react-simple-hook-modal';
import Routes from './routes';
import GlobalStyle from './styles/global';
import AppProvider from './hooks';

const App: React.FC = () => (
  <BrowserRouter>
    <AppProvider>
      <ModalProvider>
        <Routes />
      </ModalProvider>
    </AppProvider>
    <GlobalStyle />
  </BrowserRouter>
);

export default App;
