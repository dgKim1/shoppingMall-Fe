import { useQuery } from "@tanstack/react-query";
import api from "../../utils/api";
import type { OrderItem } from "./useGetOrders";

export interface OrderListParams {
  page?: number;
  ordernum?: string;
}

export interface OrderListResponse {
  status: string;
  data: OrderItem[];
  total?: number;
  totalPages?: number;
  page?: number;
}

const getOrderList = async (params: OrderListParams) => {
  const { data } = await api.get("/order", { params });
  return data as OrderListResponse;
};

const useGetOrderList = (params: OrderListParams, options = {}) =>
  useQuery({
    queryKey: ["orders", "admin", params],
    queryFn: () => getOrderList(params),
    ...options,
  });

export default useGetOrderList;
