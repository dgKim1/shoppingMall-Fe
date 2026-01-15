import { useMutation } from "@tanstack/react-query";
import api from "../../utils/api";
import type { CartItemResponse } from "./useAddToCart";

export interface RemoveCartItemByProductPayload {
  productId: string;
  size: string;
}

const removeCartItemByProduct = async (
  payload: RemoveCartItemByProductPayload
) => {
  const { data } = await api.delete("/cart/item", { data: payload });
  return data as CartItemResponse;
};

const useRemoveCartItemByProduct = (options = {}) =>
  useMutation({
    mutationFn: removeCartItemByProduct,
    ...options,
  });

export default useRemoveCartItemByProduct;
