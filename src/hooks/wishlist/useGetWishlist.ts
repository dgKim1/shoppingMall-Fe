import { useQuery } from "@tanstack/react-query";
import type { ProductType } from "../../type/product";
import api from "../../utils/api";

export interface WishlistResponse {
  status: string;
  data: ProductType[];
}

const getWishlist = async () => {
  const { data } = await api.get("/wishlist");
  return data as WishlistResponse;
};

const useGetWishlist = (enabled = true) =>
  useQuery({
    queryKey: ["wishlist", "items"],
    queryFn: getWishlist,
    enabled,
  });

export default useGetWishlist;
