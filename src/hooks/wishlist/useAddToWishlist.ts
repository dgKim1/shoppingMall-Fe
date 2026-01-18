import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ProductType } from "../../type/product";
import api from "../../utils/api";

export interface WishlistPayload {
  productId: string;
}

export interface WishlistItemResponse {
  status: string;
  data: ProductType;
}

const addToWishlist = async (payload: WishlistPayload) => {
  const { data } = await api.post("/wishlist", payload);
  return data as WishlistItemResponse;
};

const useAddToWishlist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addToWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist", "items"] });
    },
  });
};

export default useAddToWishlist;
