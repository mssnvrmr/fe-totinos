import type { OrderStatusEnum } from "../constants/order-status";
import type { Pizza } from "./Pizza";
import type { Ingredient } from "./Ingredient";
export type OrderStatus = (typeof OrderStatusEnum)[keyof typeof OrderStatusEnum];

export interface ApiOrderItem {
  pizza: string;
  quantity: number;
  extras: string[];
}

export interface ApiOrder {
  id: string;
  orderedByUserEmail: string;
  updatedByUserEmail: string;
  items: ApiOrderItem[];
  note: string;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  pizza: Pizza;
  quantity: number;
  extras: Ingredient[];
}

export interface Order {
  id: string;
  orderedByUserEmail: string;
  updatedByUserEmail: string;
  items: OrderItem[];
  note: string;
  totalPrice: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}
