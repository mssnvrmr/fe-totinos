import type { User } from "./User";
import type { OrderStatusEnum } from "../constants/order-status";
import type { Pizza } from "./Pizza";
import type { Ingredient } from "./Ingredient";
export type OrderStatus = (typeof OrderStatusEnum)[keyof typeof OrderStatusEnum];

export interface OrderItem {
  pizza: Pizza;
  quantity: number;
  extras: Ingredient[];
}

export interface Order {
  id: string;
  orderedBy: User;
  updatedBy: User;
  items: OrderItem[];
  note: string;
  totalPrice: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}