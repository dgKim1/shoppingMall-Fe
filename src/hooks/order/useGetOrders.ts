import { useQuery } from "@tanstack/react-query";
import api from "../../utils/api";

export interface OrderItem {
  _id: string;
  userId: string | { _id: string; email?: string };
  status: string;
  orderId?: string;
  totalPrice: number;
  shipTo: string;
  createdAt: string;
}

export interface OrdersResponse {
  status: string;
  data: OrderItem[];
}

const getOrders = async () => {
  const { data } = await api.get("/order");
  return data as OrdersResponse;
};

const useGetOrders = (options = {}) =>
  useQuery({
    queryKey: ["orders", "me"],
    queryFn: getOrders,
    ...options,
  });

export default useGetOrders;
