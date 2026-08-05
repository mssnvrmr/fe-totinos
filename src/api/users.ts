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
    method: "GET",
    headers: authHeaders({ "Content-Type": "application/json" }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message ?? "Failed to fetch users");
  }

  return res.json();
}

async function getUser(id: string): Promise<User> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/${id}`, {
    method: "GET",
    headers: authHeaders({ "Content-Type": "application/json" }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message ?? "Failed to fetch user");
  }

  return res.json();
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

export function useGetUsers(enabled = true) {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
    enabled,
  });
}

export function useGetUser(id: string | null, enabled = true) {
  return useQuery({
    queryKey: ["users", id],
    queryFn: () => getUser(id!),
    enabled: enabled && !!id,
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUser,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      if (variables.id) {
        queryClient.invalidateQueries({ queryKey: ["users", variables.id] });
      }
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
