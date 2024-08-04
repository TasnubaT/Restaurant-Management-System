import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Auth/AuthProvider";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const UpdateFood = () => {
  const food = useLoaderData();
  const axiosPublic = useAxiosPublic();
  const imgbb_key = "1be564ba06ddf4070f6d9cb17d75dc30";
  const imgbb_api = `https://api.imgbb.com/1/upload?key=${imgbb_key}`;
  console.log(food);
  const { user } = useContext(AuthContext);

  const [selectedImage, setSelectedImage] = useState(null);

  const [previewImage, setPreviewImage] = useState(food.foodImage);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    setSelectedImage(file);
  };

  const handleUpdateFood = async (e) => {
    console.log("clicked");
    e.preventDefault();
    const form = e.target;
    const foodTitle = form.foodTitle.value;
    const foodDescription = form.foodDescription.value;
    const foodPrice = form.foodPrice.value;
    const foodCategory = form.category.value;

    console.log(
      foodTitle,
      foodDescription,
      previewImage,
      foodPrice,
      foodCategory
    );

    Swal.fire({
      title: "Food Updating...",
      html: "Please wait for confirmation message",
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("I was closed by the timer");
      }
    });

    const response = await axiosPublic.post(
      imgbb_api,
      { image: selectedImage || previewImage },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("Image uploaded successfully:", response.data);
    let image = response.data.data.display_url;
    setPreviewImage(image);
    console.log(image);

    const foodInfo = {
      foodTitle: foodTitle,
      foodDescription: foodDescription,
      foodImage: image || previewImage,
      foodPrice: parseInt(foodPrice),
      foodCategory: foodCategory,
    };

    axiosPublic
      .put(`/foods/${food.foodID}`, foodInfo)
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Food Successfully Updated",
          showConfirmButton: false,
          timer: 1500,
        });
        // form.reset();
        navigate("/dashboard/food-list");
      })
      .catch((error) => {
        console.error("Error Uploading Food:", error);
        Swal.fire({
          icon: "error",
          title: "Error Uploading Food",
          text: "An error occurred while uploading the food. Please try again.",
        });
      });
  };

  return (
    <div>
      Update Foods
      <div>
        <div>
          <div>
            {!user ? (
              <span className="loading loading-spinner my-32 loading-lg"></span>
            ) : (
              <div className="flex mx-auto m-20">
                <div className="relative flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                  <div className="relative mx-4 mt-4 mb-4 grid h-28 place-items-center overflow-hidden rounded-xl bg-gradient-to-tr from-[#00a28f] to-[#68caa1] bg-clip-border text-white shadow-lg shadow-green-500/40">
                    <h3 className="block font-sans text-3xl font-semibold leading-snug tracking-normal text-white antialiased">
                      Update Food
                    </h3>
                  </div>

                  <div>
                    <h1 className="text-center text-2xl">
                      {user?.displayName}
                    </h1>
                    <h1 className="text-center">{user?.email}</h1>
                    <hr className="m-10" />
                    <form onSubmit={handleUpdateFood}>
                      <div className="relative h-11 m-4">
                        <input
                          type="text"
                          name="foodTitle"
                          defaultValue={food.foodTitle}
                          required
                          className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-teal-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                          placeholder=" "
                        />
                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-teal-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-teal-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-teal-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                          Food Title
                        </label>
                      </div>
                      <div className="relative h-11 m-4">
                        <input
                          type="text"
                          defaultValue={food.foodDescription}
                          name="foodDescription"
                          required
                          className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-teal-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                          placeholder=" "
                        />
                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-teal-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-teal-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-teal-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                          Food Description
                        </label>
                      </div>

                      {selectedImage ? (
                        <img
                          className="max-w-28 mx-auto rounded-xl"
                          src={selectedImage}
                          alt=""
                        />
                      ) : (
                        <img
                          className="max-w-28 mx-auto rounded-xl"
                          src={previewImage}
                          alt=""
                        />
                      )}

                      <p className="text-center my-6">
                        You can change the image by clicking below
                      </p>
                      <div className="relative h-11 m-4">
                        <input
                          type="file"
                          name="foodImage"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-teal-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                          placeholder=" "
                        />

                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-teal-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-teal-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-teal-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                          Upload Food Image
                        </label>
                      </div>

                      <div className="relative h-11 m-4">
                        <input
                          type="number"
                          name="foodPrice"
                          defaultValue={food.foodPrice}
                          required
                          className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-teal-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                          placeholder=" "
                        />
                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-teal-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-teal-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-teal-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                          Food Price
                        </label>
                      </div>
                      <div className="relative h-11 m-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="category"
                        ></label>
                        <select
                          id="category"
                          required
                          name="category"
                          defaultValue={food.foodCategory}
                          className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-teal-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        >
                          <option value="" disabled selected>
                            Choose a Category
                          </option>
                          <option value="main-courses">Main Courses</option>
                          <option value="seafood">Seafood</option>
                          <option value="vegetarian">Vegetarian</option>
                          <option value="desserts">Desserts</option>
                          <option value="beverages">Beverages</option>
                        </select>
                      </div>

                      <input
                        className="hover:cursor-pointer flex m-10 mx-auto select-none rounded-lg bg-gradient-to-tr from-[#32a374] to-[#57b38d] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="submit"
                        value="Update food"
                      />
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateFood;
