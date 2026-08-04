import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Order, OrderStatus } from "../interfaces/Order";
import type { Pizza } from "../interfaces/Pizza";

type RegisterPayload = {
  pizzas: Pizza[];
  note: string;
  totalPrice: number;
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

async function getOrders(): Promise<Order[]> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`);
  const data = await res.json();
  return data;
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

export function useCreateOrder() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: register,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
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

export function useGetOrders() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });
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