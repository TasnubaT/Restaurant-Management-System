import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAdminOrders from "../../Hooks/useAdminOrders";

const AdminOrderList = () => {
  const [adminOrders, refetchAdminOrders, isLoadingAdminOrders] =
    useAdminOrders();
  const axiosSecure = useAxiosSecure();

  console.log(adminOrders);

  // Make Admin
  const handleDeliver = (foodID) => {
    console.log(foodID);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Deliver",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/orders/${foodID}`).then((data) => {
          console.log(data);
          if (data.data.affectedRows > 0) {
            Swal.fire({
              title: "Delivered!",
              text: "Food has been delivered successfully.",
              icon: "success",
            });
            refetchAdminOrders();
          }
        });
      }
    });
  };

  return (
    <div>
      {isLoadingAdminOrders ? (
        "Loading..."
      ) : (
        <>
          <div>
            All Orders: {adminOrders.length}
            <div>
              <div className="overflow-x-auto">
                <table className="table">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>SL</th>
                      <th>Order Info</th>
                      <th>Customer Info</th>
                      <th>Order Time & Status</th>
                      <th>Order Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* row 1 */}
                    {adminOrders.map((adminOrder, idx) => (
                      <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="mask mask-squircle w-20 h-20">
                                <img src={adminOrder?.foodImage} />
                              </div>
                            </div>
                            <div>
                              <div className="text-sm opacity-50">
                                {/* ID: {adminOrder?.foodID} */}
                              </div>
                              <div className="font-bold">
                                {adminOrder?.foodTitle}
                              </div>
                              <div className="font-bold">
                                Price: {adminOrder?.foodPrice} BDT
                              </div>
                              <div className="text-sm opacity-50 ">
                                Category: {adminOrder?.foodCategory}
                              </div>
                              <hr className="opacity-15 my-2" />
                              <div className="text-sm opacity-50 ">
                                Manager Name: {adminOrder?.managerName}
                              </div>
                              <div className="text-sm opacity-50 ">
                                Manager Email: {adminOrder?.managerEmail}
                              </div>
                              <div className="text-sm opacity-50 ">
                                Added On: {adminOrder?.foodAddedDate}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="mask mask-squircle w-20 h-20">
                                <img src={adminOrder?.customerImage} />
                              </div>
                            </div>
                            <div>
                              <div className="font-bold">
                                {adminOrder?.customerName}
                              </div>
                              <div className="text-sm opacity-50 ">
                                {adminOrder?.userEmail}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="text-sm opacity-50">
                            {adminOrder?.requestDate}
                          </div>
                          <div className="text-sm opacity-50 ">
                            {adminOrder?.deliveryStatus}
                          </div>
                        </td>
                        <th>
                          <span className="flex flex-col">
                            {adminOrder.deliveryStatus == "pending" ? (
                              <button
                                onClick={() => handleDeliver(adminOrder.foodID)}
                                className="rounded-lg my-1 bg-[#008aa2] py-3 px-6 text-white"
                              >
                                Deliver
                              </button>
                            ) : (
                              ""
                            )}
                            {adminOrder.deliveryStatus == "delivered" ? (
                              <a className="rounded-lg disabled text-center my-1 bg-[#00a28f] py-3 px-6 text-white">
                                Delivered
                              </a>
                            ) : (
                              ""
                            )}
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
  );
};

export default AdminOrderList;
