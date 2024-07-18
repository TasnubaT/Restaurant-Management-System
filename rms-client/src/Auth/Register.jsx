import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { AuthContext } from "./AuthProvider";
import useAxiosPublic from "./../Hooks/useAxiosPublic";

const Register = () => {
  const axiosPublic = useAxiosPublic();

  const { createUser, updateUser, setUser, googleSignIn } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleGoogle = () => {
    googleSignIn()
      .then((result) => {
        Swal.fire({
          icon: "success",
          title: "Successfully logged in",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(result.user);
        // Send this user to DB

        function generateHexCode() {
          // Generate a random 16-digit hexadecimal number
          const hexCode = Array.from({ length: 16 }, () =>
            Math.floor(Math.random() * 16).toString(16)
          ).join("");

          return hexCode.toUpperCase(); // Convert to uppercase for consistency
        }

        const randomHexCode = generateHexCode();
        console.log(randomHexCode);

        const currentDateTimeInMs = new Date().getTime();
        const currentDate = new Date();

        const userInfo = {
          userID: randomHexCode,
          userEmail: result?.user?.email,
          userName: result?.user?.displayName,
          userPhoto: result?.user?.photoURL,
          userRole: "customer",
          timeInMS: currentDateTimeInMs,
          currentDate: currentDate,
          salary: null,
        };

        axiosPublic.post("/users", userInfo).then((res) => {
          console.log(res.data);
          navigate(from, { replace: true });
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Failed to log in",
          showConfirmButton: false,
          timer: 1500,
        });
        console.error(error);
      });
  };

  const imgbb_key = "1be564ba06ddf4070f6d9cb17d75dc30";
  const imgbb_api = `https://api.imgbb.com/1/upload?key=${imgbb_key}`;

  // const axiosPublic = useAxiosPublic();
  const [selectedImage, setSelectedImage] = useState(null);
  const [imgLink, setImgLink] = useState(null);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    setSelectedImage(file);
  };

  const handleRegister = async (e) => {
    console.log(e);
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    // let imageL = null;

    try {
      const response = await axios.post(
        imgbb_api,
        { image: selectedImage },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Image uploaded successfully:", response.data);
      let image = response.data.data.display_url;
      setImgLink(image);
      console.log(image);

      //  now send it to firebase

      if (!/^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/.test(password)) {
        Swal.fire(
          " The password must contain 6 characters, a capital letter and a special character"
        );
      } else {
        createUser(email, password)
          .then((result) => {
            console.log(result.user);
            setUser(result.user);
            updateUser(name, image);
            //   location.reload();

            // Send this user to DB
            function generateHexCode() {
              // Generate a random 16-digit hexadecimal number
              const hexCode = Array.from({ length: 16 }, () =>
                Math.floor(Math.random() * 16).toString(16)
              ).join("");

              return hexCode.toUpperCase(); // Convert to uppercase for consistency
            }

            const randomHexCode = generateHexCode();
            console.log(randomHexCode);

            const currentDateTimeInMs = new Date().getTime();
            const currentDate = new Date();

            const userInfo = {
              userID: randomHexCode,
              userEmail: result?.user?.email,
              userName: name,
              userPhoto: image,
              userRole: "customer",
              timeInMS: currentDateTimeInMs,
              currentDate: currentDate,
              salary: null,
            };
            axiosPublic.post("/users", userInfo).then((res) => {
              console.log(res);
              navigate(from, { replace: true });
            });

            Swal.fire("Successfully registered");
          })
          .catch((error) => console.error(error));
      }

      //  firebase done
    } catch (error) {
      console.error(
        "Error uploading image:",
        error.response ? error.response.data : error.message
      );
    }

    console.log("user info:", name, email, password, imgLink);
  };

  return (
    <div className="flex justify-center m-20">
      <div className="relative flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
        <div className="relative mx-4 mt-4 mb-4 grid h-28 place-items-center overflow-hidden rounded-xl bg-gradient-to-tr from-[#32a374] to-[#57b38d] bg-clip-border text-white shadow-lg shadow-green-500/40">
          <h3 className="block font-sans text-3xl font-semibold leading-snug tracking-normal text-white antialiased">
            Register
          </h3>
        </div>

        <div>
          <form onSubmit={handleRegister}>
            <div className="relative h-11 m-4">
              <input
                type="text"
                name="name"
                required
                className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=" "
              />
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Your Name
              </label>
            </div>
            <div className="relative h-11 m-4">
              <input
                type="email"
                name="email"
                required
                className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=" "
              />
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Email Address
              </label>
            </div>
            <div className="relative h-11 m-4">
              <input
                type="password"
                name="password"
                required
                className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=" "
              />
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Create a new Password
              </label>
            </div>

            <div className="relative h-11 m-4">
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={handleImageChange}
                required
                className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=" "
              />
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Upload Your Photo
              </label>
            </div>
            <input
              className="hover:cursor-pointer flex m-10 mx-auto select-none rounded-lg bg-gradient-to-tr from-[#32a374] to-[#57b38d] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="submit"
              value="Register"
            />
          </form>
        </div>
        <div className="flex flex-col gap-4 p-6">
          <p className="mt-6  flex justify-center font-sans text-sm font-light leading-normal text-inherit antialiased">
            Already registered?
            <Link to="/login">
              <span className="ml-1 block font-sans text-sm font-bold leading-normal text-green-500 antialiased">
                Log In
              </span>
            </Link>
          </p>

          <hr />
          <h1 className="text-center mb-4">Or continue using</h1>
          <button
            onClick={handleGoogle}
            className="flex mx-auto bg-teal-800 text-white px-10 py-3 rounded-xl items-center gap-2"
            type="button"
            data-ripple-light="true"
          >
            Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
