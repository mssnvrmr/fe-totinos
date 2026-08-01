import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { UserRole } from "../constants/user-roles";
import type { User } from "../interfaces/User";

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

type UpdatePayload = {
  id?: string;
  username: string;
  phone: string;
  email: string;
  role: UserRole;
  password?: string;
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
    headers: authHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message ?? "Register failed");
  }
  return { message: "Register successful" };
}

async function getUsers(): Promise<User[]> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users`, {
    headers: authHeaders(),
  });
  const data = await res.json();
  return data;
}

async function updateUser(payload: UpdatePayload): Promise<UpdateResponse> {
  const { id, ...body } = payload;
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/${id}`, {
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

async function deleteUser(id: string): Promise<DeleteResponse> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message ?? "Deletion failed");
  }
  return { message: "Deletion successful" };
}

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

export function useSignUp() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: register,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

export function useGetUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers()
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
