import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useCustomer = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: isCustomer, isLoading } = useQuery({
    queryKey: [user?.email, "isCustomer"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/customer/${user.email}`);
      console.log(res.data);
      return res.data?.customer;
    },
  });
  return [isCustomer, isLoading];
};

export default useCustomer;
