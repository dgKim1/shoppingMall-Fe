import { useMutation } from "@tanstack/react-query";
import api from "../../utils/api";

const createUser = async ({ email, password, name, role }) => {
  const { data } = await api.post("/user", { email, password, name, role });
  return data;
};

const useCreateUser = (options = {}) =>
  useMutation({
    mutationFn: createUser,
    ...options,
  });

export default useCreateUser;
