import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import AppRoutes from './routes';
import theme from './styles/theme';
import { ActionProvider } from './ActionContext';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <ActionProvider>
        <AppRoutes />
      </ActionProvider>
    </ThemeProvider>

  );
};

export default App;
