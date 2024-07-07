import { Link } from "react-router-dom";

const Error = () => {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      textAlign: "center",
    },
    heading: {
      fontSize: "3em",
      margin: "0",
    },
    text: {
      fontSize: "1.5em",
    },
  };
  return (
    <div>
      <div style={styles.container}>
        <img src="/public/404.webp" alt="" />
        <h1 style={styles.heading}>Not Found!</h1>
        <p style={styles.text}>The page you are looking for does not exist.</p>
        <Link
          className="rounded-lg my-6 bg-[#00a28f] py-3 px-6 text-white"
          to="/"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default Error;
