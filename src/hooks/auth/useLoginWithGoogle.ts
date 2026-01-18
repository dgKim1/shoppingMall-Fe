import { useMutation } from "@tanstack/react-query";
import api from "../../utils/api";

type AuthResponse = {
  status: string;
  user: unknown;
  token: string;
};

type GoogleLoginPayload = {
  idToken: string;
};

const persistToken = (data: AuthResponse) => {
  if (data?.token) {
    localStorage.setItem("token", data.token);
  }
};

const loginWithGoogle = async ({ idToken }: GoogleLoginPayload) => {
  const { data } = await api.post("/auth/google", { idToken });
  persistToken(data as AuthResponse);
  return data as AuthResponse;
};

const useLoginWithGoogle = (options = {}) =>
  useMutation({
    mutationFn: loginWithGoogle,
    ...options,
  });

export default useLoginWithGoogle;
