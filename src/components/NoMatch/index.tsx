import { useContext } from "react";
import { Link } from "react-router-dom";
import { useLightDark } from "../../contexts/LightDark";
import pageNotFound from "../../assets/not-found/page-not-found.svg";
import SharedComponents from "../SharedComponents";

const NoMatch = () => {
  const lightDarkContext = useLightDark();

  return (
    <>
      {lightDarkContext?.lightDark.isDarkMode ? (
        <div
          className={`h-screen  bg-gray-800 text-white flex justify-center align-middle items-center flex-col`}
        >
          <img
            className={`w-1/2 sm:w-1/4 p-3 m-2`}
            src={pageNotFound}
            alt={`Page Not Found`}
          />
          <p className={`p-3 m-2 text-white font-semibold`}>
            Oops! Page Not Found
          </p>

          <button
            className={`p-3 m-2 bg-emerald-200 text-gray-800 rounded font-semibold`}
          >
            <Link to={`/`}>Go To Home</Link>
          </button>
        </div>
      ) : (
        <div
          className={`h-screen bg-white text-gray-800 flex justify-center align-middle items-center flex-col`}
        >
          <img
            className={`w-1/2 sm:w-1/4 p-3 m-2`}
            src={pageNotFound}
            alt={`Page Not Found`}
          />
          <p className={`p-3 m-2 text-gray-800 font-semibold`}>
            Oops! Page Not Found
          </p>

          <button
            className={`p-3 m-2 bg-emerald-200 text-gray-800 rounded font-semibold`}
          >
            <Link to={`/`}>Go To Home</Link>
          </button>
        </div>
      )}
    </>
  );
};

export default NoMatch;
