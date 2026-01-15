import { useQuery } from "@tanstack/react-query";
import api from "../../utils/api";
import type { CartItemResponse } from "./useAddToCart";

export interface GetCartItemsResponse {
  status: string;
  data: CartItemResponse["data"][];
}

const getCartItems = async () => {
  const { data } = await api.get("/cart");
  return data as GetCartItemsResponse;
};

const useGetCartItems = (options = {}) =>
  useQuery({
    queryKey: ["cart", "items"],
    queryFn: getCartItems,
    ...options,
  });

export default useGetCartItems;
