import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import { AuthContext } from "../Auth/AuthProvider";
import { useContext } from "react";

const useAdminOrders = () => {
  const { user } = useContext(AuthContext);

  const axiosPublic = useAxiosPublic();
  const {
    data: adminOrders = [],
    refetch,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["adminOrders"],
    queryFn: async () => {
      const res = await axiosPublic.get("/orders");
      return res.data;
    },
  });
  return [adminOrders, refetch, isLoading, error];
};

export default useAdminOrders;
