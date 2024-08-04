import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../Auth/AuthProvider";
import { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";

const useManagerOrders = () => {
  const { user } = useContext(AuthContext);

  const axiosSecure = useAxiosSecure();
  const {
    data: managerOrders = [],
    refetch,
    isPending,
  } = useQuery({
    queryKey: ["managerOrders"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders/manager/${user?.email}`);
      return res.data;
    },
  });
  return [managerOrders, refetch, isPending];
};

export default useManagerOrders;
