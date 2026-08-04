import { Main } from '../../components/Templates/Main/Main';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { ImHome3 } from "react-icons/im";
import { Typography, Stack, Card } from '@mui/material';

export const Home = () => {
  return (
    <Main>
      <PageHeader title="Home" icon={<ImHome3 />} />
      <Stack sx={{ gap: 2, width: '30%' }}>
        <Typography variant="h5">Testing the app with different user roles:</Typography>
        <Stack sx={{ gap: 1 }}>
          <Typography variant="body1"><span style={{ fontWeight: 'bold', color: '#FFB300' }}>As an Admin</span> log in with the following credentials:</Typography>
          <Card sx={{ p: 2, mx: 2 }}>
            <Typography variant="body1"><b>Email:</b> admin@gmail.com</Typography>
            <Typography variant="body1"><b>Password:</b> 12345678</Typography>
          </Card>
        </Stack>
        <Stack sx={{ gap: 1 }}>
          <Typography variant="body1"><span style={{ fontWeight: 'bold', color: '#FFB300' }}>As an User</span> with orders already placed, log in with the following credentials:</Typography>
          <Card sx={{ p: 2, mx: 2 }}>
            <Typography variant="body1"><b>Email:</b> jan.doe@gmail.com</Typography>
            <Typography variant="body1"><b>Password:</b> 12345678</Typography>
          </Card>
        </Stack>
        <Stack sx={{ gap: 1 }}>
          <Typography variant="body1"><span style={{ fontWeight: 'bold', color: '#FFB300' }}>As a Guest</span> you can check the Menu, but won't be able to place an order.</Typography>
        </Stack>
        <Stack sx={{ gap: 1 }}>
          <Typography variant="body1">Or you can sign up with a new account to test the experience as a <span style={{ fontWeight: 'bold', color: '#FFB300' }}>as new User</span>.</Typography>
        </Stack>
        <Typography variant="h5">Notes:</Typography>
        <Stack sx={{ gap: 1 }}>
          <Typography variant="body1">To keep the app simple, a lot of business decision where made in a way that is not ideal for a production environment.</Typography>
        </Stack>
      </Stack>
    </Main>
  );
};