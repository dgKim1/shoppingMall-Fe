import { useMutation } from "@tanstack/react-query";
import api from "../../utils/api";

export interface ProductInput {
  sku: string;
  name: string;
  image: string;
  price: number;
  description: string;
  category: string[];
  status: string;
  isDeleted?: boolean;
  stock?: Record<string, number>;
}

export interface StatusResponse {
  status: string;
}

const createProduct = async (payload: ProductInput) => {
  const { data } = await api.post("/product/createProdcut", payload);
  return data as StatusResponse;
};

const useCreateProduct = (options = {}) =>
  useMutation({
    mutationFn: createProduct,
    ...options,
  });

export default useCreateProduct;
