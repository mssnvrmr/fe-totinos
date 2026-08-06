import { Typography, Stack, Button } from "@mui/material"
import type { Order, OrderItem, OrderStatus } from "../../interfaces/Order"
import { OrderStatusEnum } from "../../constants/order-status"
import Barcode from "react-barcode";
import { UserRolesEnum } from "../../constants/user-roles";
import { useAuth } from '../Auth/useAuth';
import { useUpdateOrder } from "../../api/orders";
import { useSnackbar } from "notistack";

const formatPrice = (price: number) => `$${price.toFixed(2)}`;

const OrderItemRow = ({ item }: { item: OrderItem }) => {
  return (
    <Stack>
      <Stack direction="row" sx={{ justifyContent: 'space-between', gap: 1, px: '5px' }}>
        <Typography variant="body2">{item.quantity} x {item.pizza.name}</Typography>
        <Typography variant="body2">{formatPrice(item.pizza.price * item.quantity)}</Typography>
      </Stack>
      <Stack>
        {item.extras.map((extra, index) => (
          <Stack key={`${extra.id}-${index}`} direction="row" sx={{ justifyContent: 'space-between', px: 2, color: 'gray' }}>
            <Typography variant="body2">{extra.name}</Typography>
            <Typography variant="body2">{formatPrice(extra.price * item.quantity)}</Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  )
}

export const Receipt = ({ order }: { order: Order }) => {
  const { role, userEmail } = useAuth();
  const isAdmin = role === UserRolesEnum.ADMIN;
  const { enqueueSnackbar } = useSnackbar();
  const { mutate: updateOrder, isPending: isUpdatingOrder } = useUpdateOrder();

  const changeOrderStatus = (
    status: OrderStatus,
    successMessage: string,
    errorMessage: string,
  ) => {
    if (!userEmail) {
      enqueueSnackbar(errorMessage, { variant: "error" });
      return;
    }

    updateOrder({
      id: order.id,
      updatedByUserEmail: userEmail,
      status,
    }, {
      onSuccess: () => {
        enqueueSnackbar(successMessage, { variant: "success" });
      },
      onError: () => {
        enqueueSnackbar(errorMessage, { variant: "error" });
      },
    });
  }

  const handleCompleteOrder = () => changeOrderStatus(
    OrderStatusEnum.FINISHED,
    "Order completed successfully",
    "Failed to complete order",
  );

  const handleCancelOrder = () => changeOrderStatus(
    OrderStatusEnum.CANCELLED,
    "Order cancelled successfully",
    "Failed to cancel order",
  );
  return (
    <Stack sx={{
      backgroundColor: 'white',
      color: 'black',
      width: '18rem',
      position: 'relative',
      padding: '1rem',
      boxShadow: '0 -0.4rem 1rem -0.4rem rgba(0, 0, 0, 0.2)',
      gap: 1,
      '&::after': {
        backgroundImage: 'linear-gradient(135deg, #fff 0.5rem, transparent 0), linear-gradient(-135deg, #fff 0.5rem, transparent 0)',
        backgroundPosition: 'left-bottom',
        backgroundRepeat: 'repeat-x',
        backgroundSize: '1rem',
        content: '""',
        display: 'block',
        position: 'absolute',
        bottom: '-1rem',
        left: '0',
        width: '100%',
        height: '1rem',
      }
    }}>
      <Stack>
        <Typography variant="body1"><b>#</b> {order.id}</Typography>
        <Typography variant="body1"><b>Placed:</b> {order.orderedByUserEmail}</Typography>
        {order.status !== OrderStatusEnum.ACTIVE && <Typography variant="body1"><b>Updated:</b> {order.updatedByUserEmail}</Typography>}
        <Typography variant="body1"><b>Date:</b> {new Date(order.createdAt).toLocaleString()}</Typography>
      </Stack>
      <Stack sx={{ borderBottom: '1px dashed #000', borderTop: '1px dashed #000', padding: '0.3rem 0' }}>
        <Typography align="center" variant="h6">Order</Typography>
      </Stack>
      <Stack sx={{ gap: 1 }}>
        <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
          <Typography variant="body1">Items</Typography>
          <Typography variant="body1">Price</Typography>
        </Stack>
        {order.items.map((item, index) => (
          <OrderItemRow key={`${item.pizza.id}-${index}`} item={item} />
        ))}
      </Stack>
      <Stack direction="row" sx={{ justifyContent: 'space-between', borderBottom: '1px dashed #000', borderTop: '1px dashed #000', py: 1 }}>
        <Typography variant="h5"><b>Total:</b></Typography>
        <Typography variant="h5"><b>{formatPrice(order.totalPrice)}</b></Typography>
      </Stack>
      {order.note && (
        <Stack sx={{ flexGrow: 1}}>
          <Typography variant="body2" sx={{ color: 'gray' }}>note: {order.note}</Typography>
        </Stack>
      )}
      {order.status === OrderStatusEnum.ACTIVE && (
        <Stack direction="row" sx={{ flexGrow: 1, justifyContent: 'space-between', gap: 1, alignItems: 'flex-end'}}>
          {isAdmin && <Button size="small" variant="contained" color="primary" onClick={handleCompleteOrder} disabled={isUpdatingOrder}>Complete</Button>}
          <Button size="small" variant="outlined" color="error" onClick={handleCancelOrder} disabled={isUpdatingOrder}>Cancel</Button>
        </Stack>
      )}
      {order.status === OrderStatusEnum.FINISHED && (
        <Stack sx={{ alignItems: 'center', overflow: 'hidden' }}>
          <Barcode value={order.id} width={1} height={40} displayValue={false} />
        </Stack>
      )}
    </Stack>
  )
}
