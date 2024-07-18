import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAdminFoodList from "../../Hooks/useAdminFoodList";
import { Link } from "react-router-dom";

const AdminFoodList = () => {
  const [adminFoods, refetchFoods, isLoadingFoods] = useAdminFoodList();
  console.log(adminFoods);
  const axiosSecure = useAxiosSecure();

  // Delete Food
  const handleDeleteFood = (foodID) => {
    console.log(foodID);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/foods/${foodID}`)
          .then((data) => {
            console.log(data);
            if (data.status == "200") {
              Swal.fire({
                title: "Deleted!",
                text: "Food has been deleted.",
                icon: "success",
              });
              refetchFoods();
            }
          })
          .catch((error) => {
            Swal.fire({
              title: "Error Encountered",
              text: `${error.message}`,
              icon: "error",
            });
          });
      }
    });
  };

  return (
    <div>
      <div>
        {isLoadingFoods ? (
          "Loading..."
        ) : (
          <>
            <div>
              Food List: {adminFoods.length}
              <div>
                <div className="overflow-x-auto">
                  <table className="table">
                    {/* head */}
                    <thead>
                      <tr>
                        <th>SL</th>
                        <th>Food Info</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* row 1 */}
                      {adminFoods.map((adminFood, idx) => (
                        <tr key={idx}>
                          <td>{idx + 1}</td>
                          <td>
                            <div className="flex items-center gap-3">
                              <div className="avatar">
                                <div className="mask mask-squircle w-20 h-20">
                                  <img src={adminFood.foodImage} />
                                </div>
                              </div>
                              <div>
                                <div className="text-sm opacity-50">
                                  {/* ID: {adminFood.foodID} */}
                                </div>
                                <div className="font-bold">
                                  {adminFood.foodTitle}
                                </div>
                                <div className="font-bold">
                                  Price: {adminFood.foodPrice} BDT
                                </div>
                                <div className="text-sm opacity-50 ">
                                  Category: {adminFood.foodCategory}
                                </div>
                                <hr className="opacity-15 my-2" />
                                <div className="text-sm opacity-50 ">
                                  Manager Name: {adminFood.managerName}
                                </div>
                                <div className="text-sm opacity-50 ">
                                  Manager Email: {adminFood.managerEmail}
                                </div>
                                <div className="text-sm opacity-50 ">
                                  Added On: {adminFood.currentDate}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td>
                            <div className="text-sm opacity-50">
                              {adminFood?.requestDate}
                            </div>
                            <div className="text-sm opacity-50 ">
                              {adminFood?.deliveryStatus}
                            </div>
                          </td>
                          <th>
                            <span className="flex flex-col">
                              <Link
                                to={`/dashboard/update-food/${adminFood.foodID}`}
                              >
                                <button
                                  // onClick={() => handleCancel(order.foodID)}
                                  className="rounded-lg my-1 bg-[#00a28f] py-3 px-6 text-white"
                                >
                                  Update Food
                                </button>
                              </Link>

                              <button
                                onClick={() =>
                                  handleDeleteFood(adminFood.foodID)
                                }
                                className="rounded-lg my-1 bg-[#d83e3e] py-3 px-6 text-white"
                              >
                                Delete Food
                              </button>
                            </span>
                          </th>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminFoodList;
