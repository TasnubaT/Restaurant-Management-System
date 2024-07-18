import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAdminFoodList = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: adminFoodList = [],
    refetch,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["adminFoodList"],
    queryFn: async () => {
      const res = await axiosPublic.get("/foods");
      return res.data;
    },
  });
  return [adminFoodList, refetch, isLoading, error];
};

export default useAdminFoodList;
