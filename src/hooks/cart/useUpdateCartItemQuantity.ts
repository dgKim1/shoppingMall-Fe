import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../utils/api";

export interface UpdateCartItemQuantityPayload {
  id: string;
  quantity: number;
}

export interface UpdateCartItemQuantityResponse {
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

const updateCartItemQuantity = async ({
  id,
  quantity,
}: UpdateCartItemQuantityPayload) => {
  const { data } = await api.patch(`/cart/item/${id}`, { quantity });
  return data as UpdateCartItemQuantityResponse;
};

const useUpdateCartItemQuantity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCartItemQuantity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", "items"] });
    },
  });
};

export default useUpdateCartItemQuantity;
