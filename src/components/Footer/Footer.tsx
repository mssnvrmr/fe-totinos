import { Stack, Typography } from '@mui/material';

export const Footer = () => {
  return (
    <Stack sx={{ justifyContent: 'center', alignItems: 'center', height: '50px', width: '100%', backgroundColor: 'primary.dark'}}>
      <Typography variant="body1">Copyright 2026 Totino's Pizza</Typography>
    </Stack>
  );
};
