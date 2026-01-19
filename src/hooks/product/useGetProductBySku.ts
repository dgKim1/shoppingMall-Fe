import { useQuery } from "@tanstack/react-query";
import api from "../../utils/api";
import type { ProductType } from "../../type/product";

export interface ProductDetailResponse {
  status: string;
  data: ProductType;
}

const getProductBySku = async (sku: string) => {
  const { data } = await api.get(`/product/getProductBySku/${sku}`);
  return data as ProductDetailResponse;
};

const useGetProductBySku = (sku?: string, options = {}) =>
  useQuery({
    queryKey: ["product", "sku", sku],
    queryFn: () => getProductBySku(sku as string),
    enabled: Boolean(sku),
    ...options,
  });

export default useGetProductBySku;
