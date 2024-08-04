import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../Auth/AuthProvider";
import { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";

const useManagerFoods = () => {
  const { user } = useContext(AuthContext);

  const axiosSecure = useAxiosSecure();

  const {
    data: managerFoods = [],
    refetch,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["managerFoods"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/foods/manager/${user?.email}`);
      return res.data;
    },
  });
  return [managerFoods, refetch, isLoading, error];
};

export default useManagerFoods;
