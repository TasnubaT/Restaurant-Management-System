import { NavLink, Outlet } from "react-router-dom";
import UserProfile from "./UserProfile";
import {
  IoFastFoodOutline,
  IoHomeOutline,
  IoPersonOutline,
  IoCart,
  IoFastFood,
  IoListOutline,
  IoLogoUsd,
  IoCashSharp,
  
} from "react-icons/io5";
import useAdmin from "../Hooks/useAdmin";
import useManager from "../Hooks/useManager";
import useCustomer from "../Hooks/useCustomer";
import useCashier from "../Hooks/useCashier";

const Dashboard = () => {
  const [isAdmin, isLoadingAdmin] = useAdmin();
  const [isManager, isLoadingManager] = useManager();
  const [isCashier, isLoadingCashier] = useCashier();
  const [isCustomer, isLoadingCustomer] = useCustomer();
  console.log("Admin", isAdmin);
  return (
    <div>
      <div>
        <div className="flex">
          <div className="min-h-screen p-5 bg-base-300">
            <h1 className="font-bold text-2xl mb-5">Dashboard</h1>
            <ul className="space-y-2 menu">
              <li>
                <NavLink to="/dashboard/profile">
                  <IoPersonOutline />
                  My Profile
                </NavLink>
              </li>
              {isCustomer ? (
                <li>
                  <NavLink to="/dashboard/my-orders">
                    <IoCart />
                    My Orders
                  </NavLink>
                </li>
              ) : (
                ""
              )}

              {isManager ? (
                <>
                  <li>
                    <NavLink to="/dashboard/add-food">
                      <IoFastFoodOutline />
                      Add Food
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/food-list">
                      <IoFastFood />
                      Food List
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/order-list">
                      <IoListOutline />
                      Order List
                    </NavLink>
                  </li>
                </>
              ) : (
                ""
              )}
              {isCashier || isAdmin ? (
                <li>
                  <NavLink to="/dashboard/sale-history">
                    <IoLogoUsd />
                    Sale History
                  </NavLink>
                </li>
              ) : (
                ""
              )}

              {isAdmin ? (
                <>
                  <li>
                    <NavLink to="/dashboard/all-users">
                      <IoFastFoodOutline />
                      All Users
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/salary">
                      <IoCashSharp />
                      Salary
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/manage-food-list">
                      <IoFastFoodOutline />
                      Food List
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/manage-order-list">
                      <IoFastFoodOutline />
                      Order List
                    </NavLink>
                  </li>
                </>
              ) : (
                ""
              )}
            </ul>
            <hr className="m-5" />
            <div className="menu">
              <ul>
                <li>
                  <NavLink to="/">
                    {" "}
                    <IoHomeOutline />
                    Home
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
          <div className="p-9 mx-auto">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
