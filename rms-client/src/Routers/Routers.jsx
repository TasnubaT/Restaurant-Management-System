import { createBrowserRouter } from "react-router-dom";
import Roots from "../Roots/Roots";
import Home from "../Home/Home";
import Error from "../Error/Error";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import Dashboard from "../Dashboard/Dashboard";
import AddFood from "../Dashboard/Manager/AddFood";
import UserProfile from "../Dashboard/UserProfile";
import AllFoods from "../Home/AllFoods";
import AllUsers from "../Dashboard/Admin/AllUsers";
import MyOrders from "./../Dashboard/Customer/MyOrders";
import FoodList from "./../Dashboard/Manager/FoodList";
import SaleHistory from "../Dashboard/Cashier/SaleHistory";
import PrivateRoutes from "./PrivateRoutes";
import FoodDetails from "./../Pages/FoodDetails";
import OrderList from "../Dashboard/Manager/OrderList";
import AdminFoodList from "../Dashboard/Admin/AdminFoodList";
import AdminOrderList from "../Dashboard/Admin/AdminOrderList";
import UpdateFood from './../Dashboard/Manager/UpdateFood';
import Salary from "../Dashboard/Admin/Salary";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Roots></Roots>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/all-foods/:id",
        element: (
          <PrivateRoutes>
            <FoodDetails></FoodDetails>
          </PrivateRoutes>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:4000/all-foods/${params.id}`),
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/all-foods",
        element: <AllFoods></AllFoods>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoutes>
        <Dashboard></Dashboard>
      </PrivateRoutes>
    ),
    children: [
      {
        path: "profile",
        element: <UserProfile></UserProfile>,
      },
      {
        path: "my-orders",
        element: <MyOrders></MyOrders>,
      },
      {
        path: "all-users",
        element: <AllUsers></AllUsers>,
      },
      {
        path: "salary",
        element: <Salary></Salary>,
      },
      {
        path: "manage-food-list",
        element: <AdminFoodList></AdminFoodList>,
      },
      {
        path: "manage-order-list",
        element: <AdminOrderList></AdminOrderList>,
      },
      // Manager
      {
        path: "add-food",
        element: <AddFood></AddFood>,
      },
      {
        path: "food-list",
        element: <FoodList></FoodList>,
      },
      {
        path: "order-list",
        element: <OrderList></OrderList>,
      },
      {
        path: "update-food/:id",
        element: <UpdateFood></UpdateFood>,
        loader: ({ params }) =>
          fetch(`http://localhost:4000/all-foods/${params.id}`),
      },
      // Cashier
      {
        path: "sale-history",
        element: <SaleHistory></SaleHistory>,
      },
    ],
  },
]);
