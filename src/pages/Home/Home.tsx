import { Main } from '../../components/Templates/Main/Main';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { ImHome3 } from "react-icons/im";
import { Typography, Stack, Card } from '@mui/material';

export const Home = () => {
  return (
    <Main>
      <PageHeader title="Home" icon={<ImHome3 />} />
      <Stack sx={{ gap: 2, width: '30%' }}>
        <Typography variant="h5">Get started:</Typography>
        <Stack sx={{ gap: 1 }}>
          <Typography variant="body1">To test the app, you can log in as an admin with the following credentials:</Typography>
          <Card sx={{ p: 2, mx: 2 }}>
            <Typography variant="body1">Email: admin@gmail.com</Typography>
            <Typography variant="body1">Password: 12345678</Typography>
          </Card>
        </Stack>
        <Stack sx={{ gap: 1 }}>
          <Typography variant="body1">As an user with orders already placed, you can log in with the following credentials:</Typography>
          <Card sx={{ p: 2, mx: 2 }}>
            <Typography variant="body1">Email: jan.doe@gmail.com</Typography>
            <Typography variant="body1">Password: 12345678</Typography>
          </Card>
        </Stack>
        <Stack sx={{ gap: 1 }}>
          <Typography variant="body1">Or you can sign up with a new account to test the experience as a new user.</Typography>
        </Stack>
        <Typography variant="h5">Notes:</Typography>
        <Stack sx={{ gap: 1 }}>
          <Typography variant="body1">To keep the app simple, a lot of business decision where made in a way that is not ideal for a production environment.</Typography>
        </Stack>
      </Stack>
    </Main>
  );
};