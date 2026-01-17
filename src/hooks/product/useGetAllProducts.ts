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
  sort?: string;
  categoryMain?: string;
  categorySub?: string;
  personType?: string;
}

const getAllProducts = async (page: number, params: GetAllProductsParams) => {
  const { data } = await api.get("/product/getAllProducts", {
    params: {
      page,
      limit: params.limit,
      sort: params.sort,
      categoryMain: params.categoryMain,
      categorySub: params.categorySub,
      personType: params.personType,
    },
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
    queryFn: ({ pageParam }) => getAllProducts(pageParam, params),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    ...options,
  });

export default useGetAllProducts;
