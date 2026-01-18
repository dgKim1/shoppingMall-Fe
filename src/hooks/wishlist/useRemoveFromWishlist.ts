import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ProductType } from "../../type/product";
import api from "../../utils/api";

export interface WishlistPayload {
  productId: string;
}

export interface WishlistRemoveResponse {
  status: string;
  data: ProductType[];
}

const removeFromWishlist = async (payload: WishlistPayload) => {
  const { data } = await api.delete("/wishlist", { data: payload });
  return data as WishlistRemoveResponse;
};

const useRemoveFromWishlist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeFromWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist", "items"] });
    },
  });
};

export default useRemoveFromWishlist;
