import { useMutation } from "@tanstack/react-query";
import api from "../../utils/api";

export interface CreateOrderPayload {
  shipTo: string;
}

export interface CreateOrderResponse {
  status: string;
  data: {
    _id: string;
    userId: string;
    status: string;
    orderId: string;
    totalPrice: number;
    shipTo: string;
    createdAt: string;
  };
}

const createOrder = async (payload: CreateOrderPayload) => {
  const { data } = await api.post("/order", payload);
  return data as CreateOrderResponse;
};

const useCreateOrder = (options = {}) =>
  useMutation({
    mutationFn: createOrder,
    ...options,
  });

export default useCreateOrder;
