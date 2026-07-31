import { Main } from '../../components/Templates/Main/Main';
import { MdRestaurantMenu } from "react-icons/md";
import { PageHeader } from '../../components/PageHeader/PageHeader';

export const Menu = () => {
  return (
    <Main>
      <PageHeader title="Menu" icon={<MdRestaurantMenu />} />
    </Main>
  );
};