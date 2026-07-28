import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Router } from './components/Router/Router';
import { SnackbarProvider } from 'notistack';
import { AuthProvider } from './components/Auth/AuthContext';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <React.Fragment>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <SnackbarProvider
          maxSnack={3}
          autoHideDuration={3000}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }} />
        <AuthProvider>
          <Router />
        </AuthProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
