import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useEmployee from "../../Hooks/useEmployee";
import { useState } from "react";

const Salary = () => {
  const [users, refetchUsers] = useEmployee();
  const [ID, setID] = useState(null);
  console.log("click", ID);
  const axiosSecure = useAxiosSecure();

  console.log("employee", users);

  //  Change Salary

  const handleUpdateSalary = (userID) => {
    setID(userID);
  };

  const handleChangeSalary = (e) => {
    e.preventDefault();

    const form = e.target;
    const salary = form.salary.value;
    const updatedSalary = { salary };
    console.log(salary);

    axiosSecure
      .put(`/salary/${ID}`, updatedSalary)
      .then((res) => {
        Swal.fire({
          position: "top-end",

          icon: "success",
          title: "Salary Successfully Updated",
          showConfirmButton: false,
          timer: 1500,
        });
        refetchUsers();
        // form.reset();
        // navigate("/dashboard/food-list");
      })
      .catch((error) => {
        console.error("Error Updating Salary:", error);
        Swal.fire({
          icon: "error",
          title: "Error Updating Salary",
          text: "An error occurred while updating the salary. Please try again.",
        });
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
                <th>Salary</th>
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

                  <td className="text-2xl font-bold">
                    {" "}
                    {user.salary ? <>BDT {user.salary}</> : ""}
                  </td>
                  <th>
                    <span className="flex flex-col">
                      <button
                        className="rounded-lg my-1 bg-[#008aa2] py-3 px-6 text-white"
                        onClick={() => {
                          document.getElementById("my_modal_5").showModal();
                          handleUpdateSalary(user.userID);
                        }}
                      >
                        Update Salary
                      </button>
                      <dialog
                        id="my_modal_5"
                        className="modal modal-bottom sm:modal-middle"
                      >
                        <div className="modal-box">
                          <form onSubmit={handleChangeSalary}>
                            <div className="relative h-11 m-4">
                              <input
                                type="number"
                                name="salary"
                                required
                                className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-teal-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                placeholder=" "
                              />
                              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-teal-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-teal-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-teal-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                Please set the new salary
                              </label>
                            </div>
                            <input
                              className="hover:cursor-pointer flex m-10 mx-auto select-none rounded-lg bg-gradient-to-tr from-[#32a374] to-[#57b38d] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                              type="submit"
                              value="Update Salary"
                            />
                          </form>

                          <div className="modal-action">
                            <form method="dialog">
                              <button className="btn">Close</button>
                            </form>
                          </div>
                        </div>
                      </dialog>
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

export default Salary;
