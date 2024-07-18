import axios from "axios";
import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Auth/AuthProvider";

const axiosSecure = axios.create({
  baseURL: "http://localhost:4000/",
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useContext(AuthContext);

  useEffect(() => {
    // Use a ref to track the mounted state of the component
    let isMounted = true;

    // Request interceptor
    const requestInterceptor = axiosSecure.interceptors.request.use(
      function (config) {
        // Do something before request is sent
        const token = localStorage.getItem("access-token");
        console.log("interceptor got hit", token);
        config.headers.authorization = `Bearer ${token}`;
        return config;
      },
      function (error) {
        // Do something with request error
        return Promise.reject(error);
      }
    );

    // Response interceptor
    const responseInterceptor = axiosSecure.interceptors.response.use(
      function (response) {
        // Any status code that lies within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
      },
      async (error) => {
        const status = error.response.status;
        if (status === 401 || status === 403) {
          // Check if the component is still mounted before navigating
          if (isMounted) {
            await logOut();
            navigate("/login");
          }
        }

        // Any status codes that fall outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
      }
    );

    // Clean up the interceptors when the component unmounts
    return () => {
      isMounted = false; // Component is unmounted
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
