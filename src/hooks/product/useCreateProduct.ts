import { useMutation } from "@tanstack/react-query";
import type { ProductInput } from "../../pages/MainPage/type/product";
import api from "../../utils/api";

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
