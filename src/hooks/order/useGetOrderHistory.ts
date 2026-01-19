import { useQuery } from "@tanstack/react-query";
import api from "../../utils/api";

export interface OrderItem {
  _id: string;
  orderId: string;
  productId: string;
  productName: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
}

export interface OrderHistoryItem {
  _id: string;
  userId: string;
  status: string;
  orderId: string;
  totalPrice: number;
  shipTo: string;
  createdAt: string;
  items: OrderItem[];
}

export interface OrderHistoryResponse {
  status: string;
  data: OrderHistoryItem[];
}

const getOrderHistory = async () => {
  const { data } = await api.get("/order");
  return data as OrderHistoryResponse;
};

const useGetOrderHistory = (options: { enabled?: boolean } = {}) =>
  useQuery({
    queryKey: ["order", "history"],
    queryFn: getOrderHistory,
    enabled: options.enabled ?? true,
  });

export default useGetOrderHistory;
