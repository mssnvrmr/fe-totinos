import { CircularProgress, Paper, Typography } from '@mui/material';
import { IoPersonSharp } from 'react-icons/io5';
import { useGetUser } from '../../api/users';
import { useAuth } from '../../components/Auth/AuthContext';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { Main } from '../../components/Templates/Main/Main';
import { UserForm } from '../../components/UserForm/UserForm';

export const Profile = () => {
  const { userId, updateUserName } = useAuth();
  const { data: user, isLoading, isError, error } = useGetUser(userId);

  return (
    <Main>
      <PageHeader title="Profile" icon={<IoPersonSharp />} />
      {isLoading && <CircularProgress />}
      {isError && (
        <Typography color="error">
          {error instanceof Error ? error.message : 'Failed to load profile'}
        </Typography>
      )}
      {user && (
        <Paper elevation={3} sx={{ width: { xs: '100%', md: '40%', lg: '30%' }, p: 4 }}>
          <UserForm
            key={user.id}
            submitLabel="Update Profile"
            user={user}
            onSuccess={(username) => {
              if (username) updateUserName(username);
            }}
          />
        </Paper>
      )}
    </Main>
  );
};
