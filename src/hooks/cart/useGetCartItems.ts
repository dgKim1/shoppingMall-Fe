import type { ProductType } from './../../type/product';
import { useQuery } from "@tanstack/react-query";
import type { CartItemResponse } from "./useAddToCart";
import api from "../../utils/api";

export interface GetCartItemsResponse {
  status: string;
  data: (CartItemResponse["data"] & { product?: ProductType  })[];
}

const getCartItems = async (userId?: string) => {
  const { data } = await api.get("/cart", {
    params: { userId },
  });
  return data as GetCartItemsResponse;
};

const useGetCartItems = (options: { enabled?: boolean; userId?: string } = {}) =>
  useQuery({
    queryKey: ["cart", "items", options.userId],
    queryFn: () => getCartItems(options.userId),
    enabled: Boolean(options.userId) && (options.enabled ?? true),
  });

export default useGetCartItems;
