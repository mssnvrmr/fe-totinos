import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Ingredient, IngredientName } from "../interfaces/Ingredient";

type RegisterPayload = {
  name: string;
  price: number;
  stock: number;
};

type RegisterResponse = {
  message: string;
};

type UpdatePayload = {
  id: string;
  name: string;
  price: number;
  stock: number;
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
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/ingredients/`, {
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

async function getIngredients(): Promise<Ingredient[]> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/ingredients`);
  const data = await res.json();
  return data;
}

async function getIngredientNames(ids: string[]): Promise<IngredientName[]> {
  const params = new URLSearchParams();
  ids.forEach((id) => params.append("ids", id));

  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/ingredients/names?${params.toString()}`,
    { headers: authHeaders() },
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message ?? "Failed to fetch ingredient names");
  }

  return res.json();
}

async function updateIngredient(payload: UpdatePayload): Promise<UpdateResponse> {
  const { id, ...body } = payload;
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/ingredients/${id}`, {
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

async function deleteIngredient(id: string): Promise<DeleteResponse> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/ingredients/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message ?? "Deletion failed");
  }
  return { message: "Deletion successful" };
}

export function useCreateIngredient() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: register,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ingredients"] });
    },
  });
}

export function useDeleteIngredient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteIngredient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ingredients"] });
    },
  });
}

export function useGetIngredients() {
  return useQuery({
    queryKey: ["ingredients"],
    queryFn: getIngredients,
  });
}

export function useGetIngredientNames(ids: string[]) {
  const uniqueIds = [...new Set(ids)].sort();

  return useQuery({
    queryKey: ["ingredient-names", uniqueIds],
    queryFn: () => getIngredientNames(uniqueIds),
    enabled: uniqueIds.length > 0,
  });
}

export function useUpdateIngredient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateIngredient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ingredients"] });
    },
  });
}
