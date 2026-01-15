import { useMutation } from "@tanstack/react-query";
import api from "../../utils/api";

const persistToken = (data) => {
  const token = data?.token || data?.accessToken;
  if (token) {
    sessionStorage.setItem("token", token);
  }
};

const loginWithGoogle = async ({ idToken }) => {
  const { data } = await api.post("/auth/google", { idToken });
  persistToken(data);
  return data;
};

const useLoginWithGoogle = (options = {}) =>
  useMutation({
    mutationFn: loginWithGoogle,
    ...options,
  });

export default useLoginWithGoogle;
