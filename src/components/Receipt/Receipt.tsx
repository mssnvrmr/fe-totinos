import { Typography, Stack, Button } from "@mui/material"
import type { Order, OrderItem } from "../../interfaces/Order"
import { OrderStatusEnum } from "../../constants/order-status"
import Barcode from "react-barcode";

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
        <Typography variant="body1">#{order.id}</Typography>
        <Typography variant="body1">by: {order.orderedByUserEmail}</Typography>
        <Typography variant="body1">on: {new Date(order.createdAt).toLocaleDateString()}</Typography>
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
        <Stack direction="row" sx={{ justifyContent: 'space-between', borderTop: '1px dashed #000', paddingTop: '0.3rem' }}>
          <Typography variant="h5">Total</Typography>
          <Typography variant="h5">{formatPrice(order.totalPrice)}</Typography>
        </Stack>
      </Stack>
      {order.note && (
        <Stack sx={{ borderTop: '1px dashed #000', paddingTop: '0.3rem' }}>
          <Typography variant="body2" sx={{ color: 'gray' }}>note: {order.note}</Typography>
        </Stack>
      )}
      {order.status === OrderStatusEnum.ACTIVE && (
        <Stack direction="row" sx={{ justifyContent: 'space-between', gap: 1 }}>
          <Button size="small" variant="contained" color="primary">Complete</Button>
          <Button size="small" variant="outlined" color="error">Cancel</Button>
        </Stack>
      )}
      {order.status === OrderStatusEnum.FINISHED && (
        <Stack sx={{ alignItems: 'center' }}>
          <Barcode value={order.id} width={1} height={40} displayValue={false} />
        </Stack>
      )}
    </Stack>
  )
}
