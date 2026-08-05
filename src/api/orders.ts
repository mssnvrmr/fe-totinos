import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import type { ApiOrder, ApiOrderItem, Order, OrderItem, OrderStatus } from "../interfaces/Order";
import type { Pizza } from "../interfaces/Pizza";
import type { Ingredient } from "../interfaces/Ingredient";
import { useGetPizzas } from "./pizza";
import { useGetIngredients } from "./ingredients";

type RegisterPayload = {
  orderedByUserEmail: string;
  items: ApiOrderItem[];
  note?: string;
  status: OrderStatus;
};
  
type RegisterResponse = {
  message: string;
};

type UpdatePayload = {
  id: string;
  pizzas: Pizza[];
  note: string;
  totalPrice: number;
  status: OrderStatus;
};

type UpdateResponse = {
  message: string;
};

type DeleteResponse = {
  message: string;
};

function authHeaders(extra: HeadersInit = {}): HeadersInit {
  const token = localStorage.getItem("jwt_token");
  return {
    ...extra,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function register(payload: RegisterPayload): Promise<RegisterResponse> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders/`, {
    method: "POST",
    headers: authHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message ?? "Creation failed");
  }
  return { message: "Creation successful" };
}

async function getOrders(): Promise<ApiOrder[]> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`, {
    method: "GET",
    headers: authHeaders({ "Content-Type": "application/json" }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message ?? "Failed to fetch orders");
  }

  return res.json();
}

async function getUserOrders(): Promise<ApiOrder[]> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders/user`, {
    method: "GET",
    headers: authHeaders({ "Content-Type": "application/json" }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message ?? "Failed to fetch user orders");
  }

  return res.json();
}

async function updateOrder(payload: UpdatePayload): Promise<UpdateResponse> {
  const { id, ...body } = payload;
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders/${id}`, {
    method: "PUT",
    headers: authHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message ?? "Update failed");
  }
  return { message: "Update successful" };
}

async function deleteOrder(id: string): Promise<DeleteResponse> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message ?? "Deletion failed");
  }
  return { message: "Deletion successful" };
}

const NO_ORDERS: ApiOrder[] = [];

const missingPizza = (id: string): Pizza => ({
  id,
  name: "Unavailable pizza",
  ingredients: [],
  description: "",
  price: 0,
});

const missingIngredient = (id: string): Ingredient => ({
  id,
  name: "Unavailable extra",
  price: 0,
  stock: 0,
});

const getItemTotal = (item: OrderItem) =>
  (item.pizza.price + item.extras.reduce((sum, extra) => sum + extra.price, 0)) * item.quantity;

function hydrateOrder(
  order: ApiOrder,
  pizzasById: Map<string, Pizza>,
  ingredientsById: Map<string, Ingredient>,
): Order {
  const items = order.items.map((item) => ({
    quantity: item.quantity,
    pizza: pizzasById.get(item.pizza) ?? missingPizza(item.pizza),
    extras: item.extras.map((id) => ingredientsById.get(id) ?? missingIngredient(id)),
  }));

  return {
    ...order,
    items,
    totalPrice: items.reduce((total, item) => total + getItemTotal(item), 0),
  };
}

function useHydratedOrders(orders: ApiOrder[]): Order[] {
  const { data: pizzas } = useGetPizzas();
  const { data: ingredients } = useGetIngredients();

  return useMemo(() => {
    const pizzasById = new Map((pizzas ?? []).map((pizza) => [pizza.id, pizza]));
    const ingredientsById = new Map(
      (ingredients ?? []).map((ingredient) => [ingredient.id, ingredient]),
    );
    return orders.map((order) => hydrateOrder(order, pizzasById, ingredientsById));
  }, [orders, pizzas, ingredients]);
}

export function useCreateOrder() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: register,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["userOrders"] });
    },
  });
}

export function useDeleteOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}

export function useGetOrders(enabled = true) {
  const { data, ...rest } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
    enabled,
  });

  return { ...rest, data: useHydratedOrders(data ?? NO_ORDERS) };
}

export function useUpdateOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}

export function useGetUserOrders(enabled = true) {
  const { data, ...rest } = useQuery({
    queryKey: ["userOrders"],
    queryFn: getUserOrders,
    enabled,
  });

  return { ...rest, data: useHydratedOrders(data ?? NO_ORDERS) };
}