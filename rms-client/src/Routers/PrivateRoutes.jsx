import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Auth/AuthProvider";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  if (user) {
    return children;
  }
  if (loading) {
    return (
      <span className="m-20 mx-auto flex loading loading-dots loading-lg"></span>
    );
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoutes;
