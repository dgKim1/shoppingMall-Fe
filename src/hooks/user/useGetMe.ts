import { useQuery } from "@tanstack/react-query";
import api from "../../utils/api";

const getMe = async () => {
  const { data } = await api.get("/user/me");
  return data;
};

const useGetMe = (options = {}) =>
  useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    ...options,
  });

export default useGetMe;
