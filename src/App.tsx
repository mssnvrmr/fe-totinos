import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Router } from './components/Router/Router';
import { SnackbarProvider } from 'notistack';
import { AuthProvider } from './components/Auth/AuthContext';
import { customTheme } from './config/customTheme';

const theme = createTheme(customTheme);

const queryClient = new QueryClient();

function App() {
  return (
    <React.Fragment>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <SnackbarProvider
            maxSnack={3}
            autoHideDuration={3000}
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
          >
            <AuthProvider>
              <Router />
            </AuthProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </React.Fragment>
  );
}

export default App;
