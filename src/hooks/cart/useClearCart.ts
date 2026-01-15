import { useMutation } from "@tanstack/react-query";
import api from "../../utils/api";

export interface StatusResponse {
  status: string;
}

const clearCart = async () => {
  const { data } = await api.delete("/cart");
  return data as StatusResponse;
};

const useClearCart = (options = {}) =>
  useMutation({
    mutationFn: clearCart,
    ...options,
  });

export default useClearCart;
