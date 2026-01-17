import { useMutation } from "@tanstack/react-query";
import api from "../../utils/api";

type AuthResponse = {
  status: string;
  user: unknown;
  token: string;
};

type EmailLoginPayload = {
  email: string;
  password: string;
};

const persistToken = (data: AuthResponse) => {
  if (data?.token) {
    sessionStorage.setItem("token", data.token);
  }
};

const loginWithEmail = async ({ email, password }: EmailLoginPayload) => {
  const { data } = await api.post("/auth/login", { email, password });
  persistToken(data as AuthResponse);
  return data as AuthResponse;
};

const useLoginWithEmail = (options = {}) =>
  useMutation({
    mutationFn: loginWithEmail,
    ...options,
  });

export default useLoginWithEmail;
