import useOrders from "../../Hooks/useOrders";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const MyOrders = () => {
  const [orders, refetch, isPending] = useOrders();
  const axiosSecure = useAxiosSecure();

  // Cancel Order
  const handleCancelOrder = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/orders/${id}`)
          .then((data) => {
            refetch();
            console.log(data);
            if (data.status == 200) {
              Swal.fire({
                title: "Cancelled!",
                text: "Order has been cancelled.",
                icon: "success",
              });
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
      {isPending ? (
        "Loading..."
      ) : (
        <>
          <div>
            {orders.length == 0 ? (
              "No Order Found"
            ) : (
              <div>
                All orders:{orders.length}
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
                      {orders.map((order, idx) => (
                        <tr key={idx}>
                          <td>{idx + 1}</td>
                          <td>
                            <div className="flex  items-center gap-3">
                              <div className="avatar">
                                <div className="mask mask-squircle w-20 h-20">
                                  <img src={order?.foodImage} />
                                </div>
                              </div>
                              <div>
                                <div className="text-sm opacity-50">
                               {/* ID: {order?.foodID} */}
                                </div>
                                <div className="font-bold">
                                  {order?.foodTitle}
                                </div>
                                <div className="font-bold">
                                  Price: {order?.foodPrice} BDT
                                </div>
                                <div className="text-sm opacity-50 ">
                                  Category: {order?.foodCategory}
                                </div>
                                <hr className="opacity-15 my-2" />
                                <div className="text-sm opacity-50 ">
                                  Manager Name: {order?.managerName}
                                </div>
                                <div className="text-sm opacity-50 ">
                                  Manager Email: {order?.managerEmail}
                                </div>
                                <div className="text-sm opacity-50 ">
                                  Added On: {order?.foodAddedDate}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="flex items-center gap-3">
                              <div className="avatar">
                                <div className="mask mask-squircle w-20 h-20">
                                  <img src={order?.customerImage} />
                                </div>
                              </div>
                              <div>
                                <div className="font-bold">
                                  {order?.customerName}
                                </div>
                                <div className="text-sm opacity-50 ">
                                  {order?.userEmail}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="text-sm opacity-50">
                              {order?.requestDate}
                            </div>
                            <div className="text-sm opacity-50 ">
                              {order?.deliveryStatus}
                            </div>
                          </td>
                          <th>
                            <span className="flex flex-col">
                              {order.deliveryStatus == "pending" ? (
                                <button
                                  onClick={() => handleCancelOrder(order.id)}
                                  className="rounded-lg my-1 bg-[#d83e3e] py-3 px-6 text-white"
                                >
                                  Cancel Order
                                </button>
                              ) : (
                                ""
                              )}
                              {order.deliveryStatus == "delivered" ? (
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
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MyOrders;
