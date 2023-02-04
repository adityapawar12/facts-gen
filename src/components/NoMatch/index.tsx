import { Link } from "react-router-dom";

const NoMatch = () => {
  return (
    <>
      <div
        className={`h-screen bg-white text-black flex justify-center align-middle items-center flex-col`}
      >
        <p className={`p-3 m-2 text-black font-semibold`}>
          Oops! Page Not Found
        </p>

        <button
          className={`p-3 m-2 bg-violet-700 text-white rounded-2xl font-semibold`}
        >
          <Link to={`/`}>Go To Home</Link>
        </button>
      </div>
    </>
  );
};

export default NoMatch;
