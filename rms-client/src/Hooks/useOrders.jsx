import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../Auth/AuthProvider";
import { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";

const useOrders = () => {
  const { user } = useContext(AuthContext);

  const axiosSecure = useAxiosSecure();
  const {
    data: orders = [],
    refetch,
    isPending,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders/${user?.email}`);
      return res.data;
    },
  });
  return [orders, refetch, isPending];
};

export default useOrders;
