export const OrderStatusEnum = {
  ACTIVE: 'active',
  FINISHED: 'finished',
  CANCELLED: 'cancelled'
} as const;

export type OrderStatus = (typeof OrderStatusEnum)[keyof typeof OrderStatusEnum];