import { Tabs, Tab, Box } from '@mui/material';
import React, { useState } from 'react';
import { useGetOrders } from '../../api/orders';
import { OrderStatusEnum } from '../../constants/order-status';
import { Receipt } from '../Receipt/Receipt';
import { UserRolesEnum } from '../../constants/user-roles';
import { useAuth } from '../Auth/AuthContext';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const CustomTabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const OrderTabs = () => {
  const { isAuthenticated, role } = useAuth();
  const isAdmin = role === UserRolesEnum.ADMIN;
  const { data: orders = [] } = useGetOrders(isAuthenticated && isAdmin);
  const activeOrders = orders?.filter((order) => order.status === OrderStatusEnum.ACTIVE);
  const completedOrders = orders?.filter((order) => order.status === OrderStatusEnum.FINISHED);
  const cancelledOrders = orders?.filter((order) => order.status === OrderStatusEnum.CANCELLED);  
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '80%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="Order tabs">
          <Tab label="Active" {...a11yProps(0)} />
          <Tab label="Finished" {...a11yProps(1)} />
          <Tab label="Cancelled" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {activeOrders?.map((order) => (
          <Receipt key={order.id} order={order} />
        ))}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {completedOrders?.map((order) => (
          <Receipt key={order.id} order={order} />
        ))}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        {cancelledOrders?.map((order) => (
          <Receipt key={order.id} order={order} />
        ))}
      </CustomTabPanel>
    </Box>

  );
};
