import { Main } from '../../components/Templates/Main/Main';
import { MdRestaurantMenu } from "react-icons/md";
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { PizzasTable } from '../../components/PizzasTable/PizzasTable';

export const Menu = () => {
  return (
    <Main>
      <PageHeader title="Menu" icon={<MdRestaurantMenu />} />
      <PizzasTable />
    </Main>
  );
};