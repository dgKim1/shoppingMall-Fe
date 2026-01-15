import { useQuery } from "@tanstack/react-query";
import api from "../../utils/api";
import type { ProductInput } from "./useCreateProduct";

export interface ProductDetailResponse {
  status: string;
  data: ProductInput;
}

const getProductById = async (id: string) => {
  const { data } = await api.get(`/product/getProductById/${id}`);
  return data as ProductDetailResponse;
};

const useGetProductById = (id?: string, options = {}) =>
  useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id as string),
    enabled: Boolean(id),
    ...options,
  });

export default useGetProductById;
