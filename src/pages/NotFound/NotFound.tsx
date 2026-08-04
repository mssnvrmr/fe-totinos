import { Main } from '../../components/Templates/Main/Main';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { HiExclamationCircle } from "react-icons/hi";
import { Typography } from '@mui/material';

export const NotFound = () => {
  return (
    <Main>
      <PageHeader title="Not Found" icon={<HiExclamationCircle />} />
      <Typography variant="body1">The page you are looking for does not exist.</Typography>
    </Main>
  );
};