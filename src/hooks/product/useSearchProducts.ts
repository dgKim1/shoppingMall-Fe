import { useQuery } from "@tanstack/react-query";
import api from "../../utils/api";
import type { ProductInput } from "../../product/type/product";

export interface SearchProductsResponse {
  status: string;
  data: ProductInput[];
  total: number;
  totalPages: number;
  page: number;
}

export interface SearchProductsParams {
  name?: string;
  page?: number;
}

const getProductsBySearch = async ({ name, page }: SearchProductsParams) => {
  const { data } = await api.get("/product/getProductsBySearch", {
    params: { name, page },
  });
  return data as SearchProductsResponse;
};

const useSearchProducts = (params: SearchProductsParams, options = {}) =>
  useQuery({
    queryKey: ["products", "search", params],
    queryFn: () => getProductsBySearch(params),
    ...options,
  });

export default useSearchProducts;
