import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../utils/api";

export interface RemoveCartItemByIdPayload {
  id: string;
}

export interface RemoveCartItemByIdResponse {
  status: string;
  data: {
    _id: string;
    cartId: string;
    productId: string;
    size: string;
    color?: string;
    quantity: number;
  };
}

const removeCartItemById = async ({ id }: RemoveCartItemByIdPayload) => {
  const { data } = await api.delete(`/cart/item/${id}`);
  return data as RemoveCartItemByIdResponse;
};

const useRemoveCartItemById = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeCartItemById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", "items"] });
    },
  });
};

export default useRemoveCartItemById;
