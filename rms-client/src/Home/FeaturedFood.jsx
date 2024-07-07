import { Link } from "react-router-dom";
import useFoods from "../Hooks/useFoods";

const FeaturedFood = () => {
  const [foods] = useFoods();
  const featuredFoods = foods.slice(-3).reverse();

  console.log(featuredFoods);

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mt-10 bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent uppercase">
        Latest Foods!{" "}
      </h1>

      <div className="flex flex-wrap justify-center gap-5 m-10">
        {featuredFoods.map((food) => (
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
                      {food.foodDescription?.length > 40
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

export default FeaturedFood;
