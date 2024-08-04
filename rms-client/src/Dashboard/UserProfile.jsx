import React, { useContext } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import useAdmin from "../Hooks/useAdmin";
import useManager from "../Hooks/useManager";
import useCashier from "../Hooks/useCashier";
import useCustomer from "../Hooks/useCustomer";

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin, isLoadingAdmin] = useAdmin();
  const [isManager, isLoadingManager] = useManager();
  const [isCashier, isLoadingCashier] = useCashier();
  const [isCustomer, isLoadingCustomer] = useCustomer();
  console.log(user);
  return (
    <div>
      {!user ? (
        <span className="loading loading-spinner my-32 loading-lg"></span>
      ) : (
        <div className="card w-96 mt-5 bg-base-100 flex items-center shadow-xl">
          <div className="avatar">
            <div className="w-24 mt-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={user?.photoURL} />
            </div>
          </div>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Welcome, {user?.displayName}!</h2>
            <p>{user?.email}</p>
            <div className="card-actions">
              <a className="rounded-lg my-6 bg-[#00a28f] py-3 px-6 text-white">
                {isAdmin ? "ADMIN" : ""}
                {isManager ? "MANAGER" : ""}
                {isCashier ? "CASHIER" : ""}
                {isCustomer ? "CUSTOMER" : ""}
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
