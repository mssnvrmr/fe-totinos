import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Router } from './components/Router/Router';
import { SnackbarProvider } from 'notistack';
import { closeSnackbar } from 'notistack'
import { AuthProvider } from './components/Auth/AuthContext';
import { customTheme } from './config/customTheme';
import { IoCloseCircleSharp } from "react-icons/io5";
import { IconButton } from '@mui/material';

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
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            action={(snackbarId) => (
              <IconButton onClick={() => closeSnackbar(snackbarId)} size="large">
                <IoCloseCircleSharp />
              </IconButton>
            )}
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
