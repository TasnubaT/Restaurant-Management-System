import ThemeSwitcher from "../Theme/ThemeSwitcher";
import Banner from "./Banner";
import FeaturedFood from "./FeaturedFood";

const Home = () => {
  return (
    <div>
      <ThemeSwitcher></ThemeSwitcher>
      <Banner></Banner>
      <FeaturedFood></FeaturedFood>
    </div>
  );
};

export default Home;
