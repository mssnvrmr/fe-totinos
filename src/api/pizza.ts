import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Pizza } from "../interfaces/Pizza";

type RegisterPayload = {
  name: string;
  ingredients: string[];
  description: string;
  price: number;
};

type RegisterResponse = {
  message: string;
};

type UpdatePayload = {
  id: string;
  name: string;
  ingredients: string[];
  description: string;
  price: number;
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
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/pizzas/`, {
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

async function getPizzas(): Promise<Pizza[]> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/pizzas`, {
    headers: authHeaders(),
  });
  const data = await res.json();
  return data;
}

async function updatePizza(payload: UpdatePayload): Promise<UpdateResponse> {
  const { id, ...body } = payload;
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/pizzas/${id}`, {
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

async function deletePizza(id: string): Promise<DeleteResponse> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/pizzas/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message ?? "Deletion failed");
  }
  return { message: "Deletion successful" };
}

export function useCreatePizza() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: register,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pizzas"] });
    },
  });
}

export function useDeletePizza() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePizza,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pizzas"] });
    },
  });
}

export function useGetPizzas() {
  return useQuery({
    queryKey: ["pizzas"],
    queryFn: getPizzas,
  });
}

export function useUpdatePizza() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePizza,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pizzas"] });
    },
  });
}