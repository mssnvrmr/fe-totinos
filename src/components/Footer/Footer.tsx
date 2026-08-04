import { Stack, Typography } from '@mui/material';

export const Footer = () => {
  return (
    <Stack sx={{ justifyContent: 'center', alignItems: 'center', minHeight: '50px', width: '100%', backgroundColor: 'primary.main'}}>
      <Typography variant="body1">Copyright 2026 Totino's Pizza</Typography>
    </Stack>
  );
};
