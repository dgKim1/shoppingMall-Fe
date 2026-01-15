import { useMutation } from "@tanstack/react-query";
import api from "../../utils/api";
import type { CartItemResponse } from "./useAddToCart";

export interface RemoveCartItemByIdParams {
  id: string;
}

const removeCartItemById = async ({ id }: RemoveCartItemByIdParams) => {
  const { data } = await api.delete(`/cart/item/${id}`);
  return data as CartItemResponse;
};

const useRemoveCartItemById = (options = {}) =>
  useMutation({
    mutationFn: removeCartItemById,
    ...options,
  });

export default useRemoveCartItemById;
