import Swal from "sweetalert2";
import useManagerOrders from "../../Hooks/useManagerOrders";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const OrderList = () => {
  const [managerOrders, refetch, isPending] = useManagerOrders();
  const axiosSecure = useAxiosSecure();

  console.log(managerOrders);

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
          refetch();
          console.log(data);
          if (data.data.affectedRows > 0) {
            Swal.fire({
              title: "Delivered!",
              text: "Food has been delivered successfully.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div>
      {isPending ? (
        "Loading..."
      ) : (
        <>
          {managerOrders.length == 0 ? (
            "No Order Found"
          ) : (
            <div>
              All Orders: {managerOrders.length}
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
                      {managerOrders.map((managerOrder, idx) => (
                        <tr key={idx}>
                          <td>{idx + 1}</td>
                          <td>
                            <div className="flex items-center gap-3">
                              <div className="avatar">
                                <div className="mask mask-squircle w-20 h-20">
                                  <img src={managerOrder?.foodImage} />
                                </div>
                              </div>
                              <div>
                                <div className="text-sm opacity-50">
                                  {/* ID: {managerOrder?.foodID} */}
                                </div>
                                <div className="font-bold">
                                  {managerOrder?.foodTitle}
                                </div>
                                <div className="font-bold">
                                  Price: {managerOrder?.foodPrice} BDT
                                </div>
                                <div className="text-sm opacity-50 ">
                                  Category: {managerOrder?.foodCategory}
                                </div>
                                <hr className="opacity-15 my-2" />
                                <div className="text-sm opacity-50 ">
                                  Manager Name: {managerOrder?.managerName}
                                </div>
                                <div className="text-sm opacity-50 ">
                                  Manager Email: {managerOrder?.managerEmail}
                                </div>
                                <div className="text-sm opacity-50 ">
                                  Added On: {managerOrder?.foodAddedDate}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="flex items-center gap-3">
                              <div className="avatar">
                                <div className="mask mask-squircle w-20 h-20">
                                  <img src={managerOrder?.customerImage} />
                                </div>
                              </div>
                              <div>
                                <div className="font-bold">
                                  {managerOrder?.customerName}
                                </div>
                                <div className="text-sm opacity-50 ">
                                  {managerOrder?.userEmail}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="text-sm opacity-50">
                              {managerOrder?.requestDate}
                            </div>
                            <div className="text-sm opacity-50 ">
                              {managerOrder?.deliveryStatus}
                            </div>
                          </td>
                          <th>
                            <span className="flex flex-col">
                              {managerOrder.deliveryStatus == "pending" ? (
                                <button
                                  onClick={() =>
                                    handleDeliver(managerOrder.foodID)
                                  }
                                  className="rounded-lg my-1 bg-[#008aa2] py-3 px-6 text-white"
                                >
                                  Deliver
                                </button>
                              ) : (
                                ""
                              )}
                              {managerOrder.deliveryStatus == "delivered" ? (
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
          )}
        </>
      )}
    </div>
  );
};

export default OrderList;
