import { Main } from '../../components/templates/Main/Main';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { GiFruitBowl } from "react-icons/gi";

export const Ingredients = () => {
  return (
    <Main>
      <PageHeader title="Ingredients" icon={<GiFruitBowl />} />
    </Main>
  );
};