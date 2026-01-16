import { useQuery } from "@tanstack/react-query";
import type { ProductInput } from "../../pages/MainPage/type/product";
import api from "../../utils/api";

export interface ProductsResponse {
  status: string;
  data: ProductInput[];
}

const getAllProducts = async () => {
  const { data } = await api.get("/product/getAllProducts");
  return data as ProductsResponse;
};

const useGetAllProducts = (options = {}) =>
  useQuery({
    queryKey: ["products", "all"],
    queryFn: getAllProducts,
    ...options,
  });

export default useGetAllProducts;
