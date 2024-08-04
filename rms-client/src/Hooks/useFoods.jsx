import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useFoods = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: foods = [],
    refetch,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["foods"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/foods`);
      return res.data;
    },
  });
  return [foods, refetch, isLoading, error];
};

export default useFoods;
