import { useMutation } from "@tanstack/react-query";
import api from "../../utils/api";
import type { StatusResponse } from "./useCreateProduct";

export interface DeleteProductParams {
  id: string;
}

const deleteProductById = async ({ id }: DeleteProductParams) => {
  const { data } = await api.delete(`/product/deleteProduct/${id}`);
  return data as StatusResponse;
};

const useDeleteProductById = (options = {}) =>
  useMutation({
    mutationFn: deleteProductById,
    ...options,
  });

export default useDeleteProductById;
