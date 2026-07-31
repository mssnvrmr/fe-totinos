import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UserRole } from "../constants/user-roles";

type LoginPayload = {
  email: string;
  password: string;
};

type LoginResponse = {
  token: string;
  name: string;
  role: UserRole;
};

type RegisterPayload = {
  username: string;
  phone: string;
  email: string;
  password: string;
  role: UserRole;
};

type RegisterResponse = {
  message: string;
};

async function login(payload: LoginPayload): Promise<LoginResponse> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message ?? "Login failed");
  }
  const data = await res.json();
  return {
    token: data.token,
    name: data.name,
    role: data.role as UserRole,
  };
}

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

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: ({ token, name, role }) => {
      localStorage.setItem("token", token);
      localStorage.setItem("user_name", name);
      localStorage.setItem("user_role", role);
      // optional: refresh any user-related queries
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

export function useSignUp() {
  return useMutation({
    mutationFn: register,
    onSuccess: () => {}
  });
}