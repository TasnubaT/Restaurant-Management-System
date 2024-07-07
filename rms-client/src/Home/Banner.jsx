import { motion } from "framer-motion";

const Banner = () => {
  const hoverAnimation = {
    hover: {
      scale: 0.5, // Scale the image to 110% on hover
      transition: { duration: 0.2 },
    },
    rest: {
      scale: 1, // Return to the original size when not hovered
    },
  };

  return (
    <div className="p-2  text-center lg:text-left md:text-left">
      <div>
        <div className="hero-content flex-col-reverse lg:flex-row-reverse ">
          <motion.img
            initial="rest"
            whileHover="hover"
            variants={hoverAnimation}
            src="https://i.ibb.co/SvVM6ZQ/banner.webp"
            className="max-w-xl  rounded-lg "
          />
          <div className="w-full md:w-2/4 lg:w-2/4">
            <h1 className="text-3xl font-light  bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
              Spice Lounge
              <br />
              <span className="text-[#ef2b47] text-3xl md:text-5xl lg:text-7xl font-bold  bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
                Savor the Moment, Taste the Tradition
              </span>
            </h1>
            <p className="py-6 font-light">
              Welcome to Spice Lounge, where culinary creativity meets the art
              of relaxation. Step into a world of flavor and flair, where every
              dish is a symphony of spices carefully orchestrated to delight
              your senses.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
