import { Stack, Typography, Button, Divider, TextField, IconButton } from "@mui/material"
import type { OrderItem } from "../../interfaces/Order"
import { IoCloseSharp } from "react-icons/io5";

const getItemUnitPrice = (item: OrderItem) =>
  item.pizza.price + item.extras.reduce((sum, extra) => sum + extra.price, 0);

interface OrderSummaryProps {
  orderItems: OrderItem[];
  notes: string;
  onClearOrder: () => void;
  onRemoveItemFromOrder: (index: number) => void;
  onUpdateNotes: (notes: string) => void;
}

export const OrderSummary = ({ orderItems, notes, onClearOrder, onRemoveItemFromOrder, onUpdateNotes }: OrderSummaryProps) => {
  const total = orderItems.reduce(
    (acc, item) => acc + getItemUnitPrice(item) * item.quantity,
    0,
  );

  return (
    <Stack sx={{ gap: 2, width: '30%' }}>
      <Typography variant="h4" sx={{ color: 'secondary.main' }}>Order Summary</Typography>
      <Divider />
      <Stack sx={{ px: 2 }}>
        {orderItems.map((item, index) => (
          <Stack key={index}>
            <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body1">{item.quantity} x {item.pizza.name}</Typography>
              <Typography variant="body2">
                ${(item.pizza.price * item.quantity).toFixed(2)}
                <IconButton onClick={() => onRemoveItemFromOrder(index)} sx={{ ml: 1 }}>
                  <IoCloseSharp color="red" />
                </IconButton>
              </Typography>
            </Stack>
            <Stack>
              {item.extras.length > 0 && (
                <Stack sx={{ px: 1, pr: 6, color: 'text.secondary' }}>
                  {item.extras.map((extra) => (
                    <Stack key={extra.id} direction="row" sx={{ justifyContent: 'space-between', px: 1 }}>
                      <Typography variant="body2">{extra.name}</Typography>
                      <Typography variant="body2">${(extra.price * item.quantity).toFixed(2)}</Typography>
                    </Stack>
                  ))}
                </Stack>
              )}
            </Stack>
          </Stack>
        ))}
      </Stack>
      <Divider />
      <TextField
        name="notes"
        value={notes}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onUpdateNotes(e.target.value)}
        label="Add any special instructions or notes here"
        multiline
      />
      <Divider />
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" sx={{ color: 'secondary.main' }}>Total:</Typography>
        <Typography variant="h5">${total.toFixed(2)}</Typography>
      </Stack>
      <Stack direction="row" sx={{ gap: 2, alignItems: 'center' }}>
        <Button variant="contained" color="primary" disabled={orderItems.length === 0}>
          Place Order
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          disabled={orderItems.length === 0}
          onClick={onClearOrder}
        >
          Clear Order
        </Button>
      </Stack>
    </Stack>
  )
}