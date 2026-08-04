import { Main } from '../../components/Templates/Main/Main';
import { IoPersonSharp } from "react-icons/io5";
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { Typography } from '@mui/material';


export const Profile = () => {
  
  return (
    <Main>
      <PageHeader title="Profile" icon={<IoPersonSharp />} />
      <Typography variant="h5">Profile</Typography>
    </Main>
  );
};
