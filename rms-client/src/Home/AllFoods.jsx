import { Link } from "react-router-dom";

import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";

const AllFoods = () => {
  const [search, setSearch] = useState("");

  const searchRef = useRef(null);

  const [foods, setFoods] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/searched-foods?search=${search}`)
      .then((res) => res.json())
      .then((data) => setFoods(data));
  }, [search]);

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mt-10 bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent uppercase">
        All Foods
      </h1>

      <div className=" justify-center m-10 flex">
        <div className="form-control">
          <div className="input-group">
            <input
              onChange={() => {
                setSearch(searchRef.current.value);
              }}
              ref={searchRef}
              type="text"
              placeholder="Search…"
              className="input input-bordered"
            />
            <button
              onClick={() => {
                {
                  searchRef.current.value === "" &&
                    Swal.fire({
                      icon: "error",
                      title: "Search Box Empty",
                      text: "Please write something on search box",
                    });
                }
                setSearch(searchRef.current.value);
              }}
              className="btn btn-square ms-2 "
            >
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </button>
          </div>
          {foods.length < 1 ? (
            <>
              <h1 className="text-4xl mt-9">No Foods Found</h1>
            </>
          ) : (
            <>
              <p className="text-center mt-9">{foods.length} Food(s) Found</p>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-5 m-10">
        {foods.map((food) => (
          <div key={food.foodID}>
            <div className="card  w-96 h-full bg-base-100 shadow-xl">
              <figure className="px-10  rounded pt-10">
                <img
                  src={food?.foodImage}
                  alt="Shoes"
                  className="rounded-xl max-h-40 object-cover w-full h-full"
                />
              </figure>
              <div className="card-body  ">
                <p className="text-xl font-bold uppercase text-center">
                  {food.foodTitle}
                </p>

                <div className=" gap-3">
                  <div>
                    <p className="text-center">
                      {food.foodDescription.length > 40
                        ? food.foodDescription.slice(0, 40) + "..."
                        : food.foodDescription}
                    </p>

                    <p className="bg-slate-700 uppercase w-max text-white rounded px-3 py-1 mx-auto my-3">
                      {food.foodCategory}
                    </p>
                    <p className="text-center py-4 font-semibold text-2xl">
                      {food.foodPrice} TAKA
                    </p>
                  </div>
                </div>

                <div className=" ">
                  <Link to={`/all-foods/${food.foodID}`}>
                    {" "}
                    <button className="btn w-full bg-[#00a28f] text-white ">
                      Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllFoods;
