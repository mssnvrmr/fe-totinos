import { useMutation, useQueryClient } from "@tanstack/react-query";

type LoginPayload = {
  email: string;
  password: string;
};

type LoginResponse = {
  token: string;
  name: string;
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
  return res.json();
}

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: ({ token, name }) => {
      localStorage.setItem("token", token);
      localStorage.setItem("user_name", name);
      // optional: refresh any user-related queries
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}