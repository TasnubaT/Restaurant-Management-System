import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useManager = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: isManager, isLoading } = useQuery({
    queryKey: [user?.email, "isManager"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/manager/${user.email}`);
      console.log(res.data);
      return res.data?.manager;
    },
  });
  return [isManager, isLoading];
};

export default useManager;
