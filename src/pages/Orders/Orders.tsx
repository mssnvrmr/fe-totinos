import { Main } from '../../components/Templates/Main/Main';
import { IoReceiptSharp } from "react-icons/io5";
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { OrderTabs } from '../../components/OrderTabs/OrderTabs';


export const Orders = () => {
  
  return (
    <Main>
      <PageHeader title="Orders" icon={<IoReceiptSharp />} />
      <OrderTabs />
    </Main>
  );
};
