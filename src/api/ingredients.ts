import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Ingredient } from "../interfaces/Ingredient";

type RegisterPayload = {
  name: string;
  price: number;
  stock: number;
};

type RegisterResponse = {
  message: string;
};

async function register(payload: RegisterPayload): Promise<RegisterResponse> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message ?? "Register failed");
  }
  return { message: "Register successful" };
}

async function getIngredients(): Promise<Ingredient[]> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/ingredients`);
  const data = await res.json();
  return data;
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

export function useGetIngredients() {
  return useQuery({
    queryKey: ["ingredients"],
    queryFn: getIngredients,
  });
}