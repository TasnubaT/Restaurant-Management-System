import Swal from "sweetalert2";
import useUsers from "../../Hooks/useUsers";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const AllUsers = () => {
  const [users, refetchUsers] = useUsers();
  const axiosSecure = useAxiosSecure();

  console.log(users);

  // Make Admin
  const handleMakeAdmin = (userID) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Make Admin",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/admin/${userID}`).then((data) => {
          console.log(data);
          if (data.data.affectedRows > 0) {
            Swal.fire({
              title: "Admin Assigned!",
              text: "User has been assigned as an admin.",
              icon: "success",
            });
            refetchUsers();
          }
        });
      }
    });
  };
  // Make Manager
  const handleMakeManager = (userID) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Make Manager",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/manager/${userID}`).then((data) => {
          console.log(data);
          if (data.data.affectedRows > 0) {
            Swal.fire({
              title: "Manager Assigned!",
              text: "User has been assigned as a manager.",
              icon: "success",
            });
            refetchUsers();
          }
        });
      }
    });
  };
  // Make Cashier
  const handleMakeCashier = (userID) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Make Cashier",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/cashier/${userID}`).then((data) => {
          console.log(data);
          if (data.data.affectedRows > 0) {
            Swal.fire({
              title: "Cashier Assigned!",
              text: "User has been assigned as a cashier.",
              icon: "success",
            });
            refetchUsers();
          }
        });
      }
    });
  };

  // Delete Users

  const handleDeleteUser = (userID) => {
    console.log(userID);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${userID}`).then((data) => {
          console.log(data);
          if (data.status == "200") {
            Swal.fire({
              title: "Deleted!",
              text: "User has been deleted.",
              icon: "success",
            });
            refetchUsers();
          }
        });
      }
    });
  };

  return (
    <div>
      All Users:{users.length}
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>SL</th>
                <th>Name & Image</th>
                <th>Email & ID</th>
                <th>Joined On</th>
                <th>Assign Role</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {users.map((user, idx) => (
                <tr key={user.userID}>
                  <td>{idx + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={user?.userPhoto} />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{user?.userName}</div>
                        <div className="text-sm opacity-50 uppercase">
                          {user?.userRole}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {user?.userEmail}
                    <br />
                    <span className="badge badge-ghost badge-sm">
                      ID: {user?.userID}
                    </span>
                  </td>
                  <td>{user?.currentDate}</td>
                  <th>
                    <span className="flex flex-col">
                      {user.userRole !== "admin" ? (
                        <>
                          {" "}
                          <button
                            onClick={() => handleMakeAdmin(user.userID)}
                            className="rounded-lg my-1 bg-[#008aa2] py-3 px-6 text-white"
                          >
                            Make Admin
                          </button>
                          {user.userRole !== "manager" ? (
                            <button
                              onClick={() => handleMakeManager(user.userID)}
                              className="rounded-lg my-1 bg-[#00a28f] py-3 px-6 text-white"
                            >
                              Make Manager
                            </button>
                          ) : (
                            ""
                          )}
                          {user.userRole !== "cashier" ? (
                            <button
                              onClick={() => handleMakeCashier(user.userID)}
                              className="rounded-lg my-1 bg-[#685fbd] py-3 px-6 text-white"
                            >
                              Make Cashier
                            </button>
                          ) : (
                            ""
                          )}
                          <button
                            onClick={() => handleDeleteUser(user.userID)}
                            className="rounded-lg my-1 bg-[#d83e3e] py-3 px-6 text-white"
                          >
                            Delete
                          </button>
                        </>
                      ) : (
                        "Admin can't be modified"
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
  );
};

export default AllUsers;
