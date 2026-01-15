import { useMutation } from "@tanstack/react-query";
import api from "../../utils/api";

const persistToken = (data) => {
  const token = data?.token || data?.accessToken;
  if (token) {
    sessionStorage.setItem("token", token);
  }
};

const loginWithEmail = async ({ email, password }) => {
  const { data } = await api.post("/auth/login", { email, password });
  persistToken(data);
  return data;
};

const useLoginWithEmail = (options = {}) =>
  useMutation({
    mutationFn: loginWithEmail,
    ...options,
  });

export default useLoginWithEmail;
