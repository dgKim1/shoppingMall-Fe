import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import type { ProductInput } from "../../type/product";
import api from "../../utils/api";

export interface ProductsResponse {
  status: string;
  data: ProductInput[];
  total: number;
  totalPages: number;
  page: number;
}

export interface GetAllProductsParams {
  limit?: number;
}

const getAllProducts = async (page: number, limit?: number) => {
  const { data } = await api.get("/product/getAllProducts", {
    params: { page, limit },
  });
  return data as ProductsResponse;
};

const useGetAllProducts = (params: GetAllProductsParams = {}, options = {}) =>
  useInfiniteQuery<
    ProductsResponse,
    Error,
    InfiniteData<ProductsResponse>,
    (string | GetAllProductsParams)[],
    number
  >({
    queryKey: ["products", "all", params],
    queryFn: ({ pageParam }) => getAllProducts(pageParam, params.limit),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    ...options,
  });

export default useGetAllProducts;
