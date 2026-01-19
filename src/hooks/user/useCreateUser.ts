import { useMutation } from "@tanstack/react-query";
import api from "../../utils/api";

type CreateUserPayload = {
  email: string;
  password: string;
  name: string;
  role: string;
};

const createUser = async ({ email, password, name, role }: CreateUserPayload) => {
  const { data } = await api.post("/user", { email, password, name, role });
  return data;
};

const useCreateUser = (options = {}) =>
  useMutation({
    mutationFn: createUser,
    ...options,
  });

export default useCreateUser;
