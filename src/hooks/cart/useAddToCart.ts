import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../utils/api";
import type { ProductInput } from "../../type/product";

export interface CartItemPayload {
  productId: string;
  size: string;
  color: string;
  quantity: number;
}

export interface CartItemResponse {
  status: string;
  data: {
    _id: string;
    cartId: string;
    productId: string | ProductInput;
    size: string;
    color?: string;
    quantity: number;
  };
}

const addToCart = async (payload: CartItemPayload) => {
  const { data } = await api.post("/cart", payload);
  return data as CartItemResponse;
};

const useAddToCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", "items"] });
    },
  });
};

export default useAddToCart;
