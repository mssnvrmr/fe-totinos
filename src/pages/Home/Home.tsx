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
          <Typography variant="body1">Or you can sign up with a new account to test the experience <span style={{ fontWeight: 'bold', color: '#FFB300' }}>as a new User</span>.</Typography>
        </Stack>
        <Typography variant="h5">Search by Criteria:</Typography>
        <Stack sx={{ gap: 1 }}>
          <Typography variant="body1"><span style={{ fontWeight: 'bold', color: '#FFB300' }}>Search by Id</span> only works for <span style={{ fontWeight: 'bold', color: '#FFB300' }}>Ingredients</span>. The ID is exposed on purpose to make it easier to test the functionality.</Typography>
          <Card sx={{ p: 2, mx: 2 }}>
            <Typography variant="body1"><b>Olives ID:</b> 8fade6dc-6bd1-4f6d-be1b-08ba8de55828</Typography>
          </Card>
        </Stack>
        <Stack sx={{ gap: 1 }}>
          <Typography variant="body1"><span style={{ fontWeight: 'bold', color: '#FFB300' }}>Search by E-mail</span> only works for <span style={{ fontWeight: 'bold', color: '#FFB300' }}>Users</span>.</Typography>
        </Stack>
      </Stack>
    </Main>
  );
};