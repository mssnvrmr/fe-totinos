import { Main } from '../../components/Templates/Main/Main';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { ImHome3 } from "react-icons/im";

export const Home = () => {
  return (
    <Main>
      <PageHeader title="Home" icon={<ImHome3 />} />
    </Main>
  );
};