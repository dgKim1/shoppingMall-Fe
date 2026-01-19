import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import api from "../../utils/api";
import type { ProductType } from "../../type/product";

export interface SearchProductsResponse {
  status: string;
  data: ProductType[];
  total: number;
  totalPages: number;
  page: number;
}

export interface SearchProductsParams {
  name?: string;
  limit?: number;
}

const getProductsBySearch = async (
  page: number,
  { name, limit }: SearchProductsParams,
) => {
  const { data } = await api.get("/product/getProductsBySearch", {
    params: { name, page, limit },
  });
  return data as SearchProductsResponse;
};

const useSearchProducts = (params: SearchProductsParams, options = {}) =>
  useInfiniteQuery<
    SearchProductsResponse,
    Error,
    InfiniteData<SearchProductsResponse>,
    (string | SearchProductsParams)[],
    number
  >({
    queryKey: ["products", "search", params],
    queryFn: ({ pageParam }) => getProductsBySearch(pageParam, params),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    ...options,
  });

export default useSearchProducts;
