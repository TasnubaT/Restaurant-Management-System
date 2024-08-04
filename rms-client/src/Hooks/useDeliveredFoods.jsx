import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useDeliveredFoods = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: deliveredFoods = [],
    refetch,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["deliveredFoods"],
    queryFn: async () => {
      const res = await axiosPublic.get("/delivered-orders");
      return res.data;
    },
  });
  console.log(deliveredFoods);
  return [deliveredFoods, refetch, isLoading, error];
};

export default useDeliveredFoods;
