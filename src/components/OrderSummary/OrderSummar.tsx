import { Stack, Typography, Button, Divider } from "@mui/material"
import type { OrderItem } from "../../interfaces/Order"

export const OrderSummary = ({ orderItems }: { orderItems: OrderItem[] }) => {
  return (
    <Stack sx={{ gap: 2, px: 2 }}>
      <Typography variant="h4" sx={{ color: 'secondary.main' }}>Order Summary</Typography>
      <Divider />
      <Stack sx={{ gap: 2, px: 2 }}>
        {orderItems.map((item, index) => (
          <Stack key={index} direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <Stack>
              <Typography variant="body1">{item.quantity} x {item.pizza.name}</Typography>
              <Typography variant="body2">{item.extras.map((extra) => extra.name).join(', ')}</Typography>
            </Stack>
            <Typography variant="body2">${item.pizza.price.toFixed(2)}</Typography>
          </Stack>
        ))}
      </Stack>
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" sx={{ color: 'secondary.main' }}>Total:</Typography>
        <Typography variant="h5">${orderItems.reduce((acc, item) => acc + item.pizza.price * item.quantity, 0).toFixed(2)}</Typography>
      </Stack>
      <Stack direction="row" sx={{ gap: 2, alignItems: 'center' }}>
        <Button variant="contained" color="primary">Place Order</Button>
        <Button variant="outlined" color="secondary">Clear Order</Button>
      </Stack>
    </Stack>
  )
}