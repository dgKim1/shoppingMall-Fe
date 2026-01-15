import { useMutation } from "@tanstack/react-query";
import api from "../../utils/api";
import type { ProductInput } from "./useCreateProduct";

export interface UpdateProductResponse {
  status: string;
  data: ProductInput;
}

export interface UpdateProductParams {
  id: string;
  payload: Partial<ProductInput>;
}

const updateProductById = async ({ id, payload }: UpdateProductParams) => {
  const { data } = await api.put(`/product/updateProductById/${id}`, payload);
  return data as UpdateProductResponse;
};

const useUpdateProductById = (options = {}) =>
  useMutation({
    mutationFn: updateProductById,
    ...options,
  });

export default useUpdateProductById;
