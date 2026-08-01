import { Main } from '../../components/Templates/Main/Main';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { HiUsers } from "react-icons/hi";
import { UsersTable } from '../../components/UsersTable/UsersTable';

export const Users = () => {
  return (
    <Main>
      <PageHeader title="Users" icon={<HiUsers />} />
      <UsersTable />
    </Main>
  );
};