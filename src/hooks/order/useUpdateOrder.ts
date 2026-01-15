import { useMutation } from "@tanstack/react-query";
import api from "../../utils/api";
import type { OrderItem } from "./useGetOrders";

export interface UpdateOrderParams {
  id: string;
  status: string;
}

export interface UpdateOrderResponse {
  status: string;
  data: OrderItem;
}

const updateOrder = async ({ id, status }: UpdateOrderParams) => {
  const { data } = await api.put(`/order/${id}`, { status });
  return data as UpdateOrderResponse;
};

const useUpdateOrder = (options = {}) =>
  useMutation({
    mutationFn: updateOrder,
    ...options,
  });

export default useUpdateOrder;
