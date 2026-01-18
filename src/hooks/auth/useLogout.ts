import { useMutation } from "@tanstack/react-query";
import api from "../../utils/api";

export interface LogoutResponse {
  status: string;
}

const logout = async () => {
  const { data } = await api.post("/auth/logout");
  return data as LogoutResponse;
};

const useLogout = (options = {}) =>
  useMutation({
    mutationFn: logout,
    ...options,
  });

export default useLogout;
