import { Paper } from '@mui/material';
import { FaFileSignature } from 'react-icons/fa';
import { Main } from '../../components/Templates/Main/Main';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { UserForm } from '../../components/UserForm/UserForm';
import { ROUTES } from '../../config/routes';
import { useNavigate } from 'react-router-dom';

export const SignUp = () => {
  const navigate = useNavigate();
  return (
    <Main>
      <PageHeader title="Sign Up" icon={<FaFileSignature />} />
      <Paper elevation={3} sx={{ width: { xs: '100%', md: '40%', lg: '30%' }, p: 4 }}>
        <UserForm submitLabel="Sign Up" onSuccess={() => navigate(ROUTES.ORDERS)} />
      </Paper>
    </Main>
  );
};
