import { useMutation } from "@tanstack/react-query";
import api from "../../utils/api";

export interface CartItemPayload {
  productId: string;
  size: string;
  quantity: number;
}

export interface CartItemResponse {
  status: string;
  data: {
    _id: string;
    cartId: string;
    productId: string;
    size: string;
    quantity: number;
  };
}

const addToCart = async (payload: CartItemPayload) => {
  const { data } = await api.post("/cart", payload);
  return data as CartItemResponse;
};

const useAddToCart = (options = {}) =>
  useMutation({
    mutationFn: addToCart,
    ...options,
  });

export default useAddToCart;
