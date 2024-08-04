import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useEmployee = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: employee = [],
    refetch,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["employee"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/employee`);
      return res.data;
    },
  });
  return [employee, refetch, isLoading, error];
};

export default useEmployee;
