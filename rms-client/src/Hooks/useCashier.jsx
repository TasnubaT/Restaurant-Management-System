import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useCashier = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: isCashier, isLoading } = useQuery({
    queryKey: [user?.email, "isCashier"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/cashier/${user.email}`);
      console.log(res.data);
      return res.data?.cashier;
    },
  });
  return [isCashier, isLoading];
};

export default useCashier;
