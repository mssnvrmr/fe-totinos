import React from 'react';
import { Box, Container } from '@mui/material';
import { NavBar } from '../../NavBar/NavBar';
import { Footer } from '../../Footer/Footer';

export const Main = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <NavBar />
      <Container sx={{ width: '90%', margin: '0 auto', flex: 1 }}>
        {children}
      </Container>
      <Footer />
    </Box>
  );
};
