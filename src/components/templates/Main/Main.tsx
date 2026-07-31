import React from 'react';
import { Stack } from '@mui/material';
import { NavBar } from '../../NavBar/NavBar';
import { Footer } from '../../Footer/Footer';

export const Main = ({ children }: { children: React.ReactNode }) => {
  return (
    <Stack sx={{ display: 'flex', height: '100vh', width: '100vw', alignItems: 'center'}}>
      <NavBar />
      <Stack
        sx={{
          width: '100%',
          flex: 1,
          p: 4,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {children}
      </Stack>
      <Footer />
    </Stack>
  );
};
