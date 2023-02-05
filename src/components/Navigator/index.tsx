import { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useLightDark } from "../../contexts/LightDark";
import { useNavigate, useLocation } from "react-router-dom";

const Navigator = () => {
  const [currentRoute, setCurrentRoute] = useState<string>("home");

  const lightDarkContext = useLightDark();
  const navigate = useNavigate();
  const location = useLocation();

  const arrowNavigationLeft = () => {
    if (currentRoute === `/facts-generator`) {
      navigate(`/home`);
    }
  };
  const arrowNavigationRight = () => {
    if (currentRoute === `/home`) {
      navigate(`/facts-generator`);
    }
  };

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/home");
    }
    setCurrentRoute(location.pathname);
  }, [location]);

  return (
    <>
      <div className={`absolute bottom-2 left-32 z-10 text-center`}>
        <div className={`flex flex-row rounded-2xl`}>
          {!lightDarkContext?.lightDark.isDarkMode ? (
            <div
              className={`basis-1/2 p-0 m-0 text-center font-semibold text-xl inline bg-gray-800 text-emerald-200 border-2 border-gray-800 rounded-2xl`}
            >
              <div
                className={`flex p-0 m-0 flex-row items-center align-middle justify-center`}
              >
                <div
                  onClick={arrowNavigationLeft}
                  className={`inline py-2.5 p-0 m-0 px-1 h-fit hover:bg-emerald-200 hover:text-gray-800 rounded-l-2xl`}
                >
                  <IoIosArrowBack />
                </div>
                {currentRoute === "/home" && (
                  <div
                    onClick={() => {
                      navigate(`/home`);
                    }}
                    className={`inline py-1.5 px-2 ${
                      currentRoute === "/home" && "bg-emerald-200 text-gray-800"
                    } hover:bg-emerald-200 hover:text-gray-800`}
                  >
                    Home
                  </div>
                )}
                {currentRoute === "/facts-generator" && (
                  <div
                    onClick={() => {
                      navigate(`/facts-generator`);
                    }}
                    className={`inline py-1.5 px-2 ${
                      currentRoute === "/facts-generator" &&
                      "bg-emerald-200 text-gray-800"
                    } hover:bg-emerald-200 hover:text-gray-800`}
                  >
                    Facts
                  </div>
                )}
                <div
                  onClick={arrowNavigationRight}
                  className={`inline py-2.5 p-0 m-0 px-1 hover:bg-emerald-200 hover:text-gray-800 rounded-r-2xl`}
                >
                  <IoIosArrowForward />
                </div>
              </div>
            </div>
          ) : (
            <div
              className={`basis-1/2 text-center font-semibold text-xl d-inline bg-emerald-200 text-gray-800 border-2 border-emerald-200 rounded-2xl`}
            >
              <div
                className={`flex p-0 m-0 flex-row items-center align-middle justify-center`}
              >
                <div
                  onClick={arrowNavigationLeft}
                  className={`inline py-2.5 p-0 m-0 px-1 h-fit hover:bg-gray-800 hover:text-emerald-200 rounded-l-2xl`}
                >
                  <IoIosArrowBack />
                </div>
                {currentRoute === "/home" && (
                  <div
                    onClick={() => {
                      navigate(`/home`);
                    }}
                    className={`inline py-1.5 px-2 ${
                      currentRoute === "/home" && "bg-gray-800 text-emerald-200"
                    } hover:bg-gray-800 hover:text-emerald-200`}
                  >
                    Home
                  </div>
                )}
                {currentRoute === "/facts-generator" && (
                  <div
                    onClick={() => {
                      navigate(`/facts-generator`);
                    }}
                    className={`inline py-1.5 px-2 ${
                      currentRoute === "/facts-generator" &&
                      "bg-gray-800 text-emerald-200"
                    } hover:bg-gray-800 hover:text-emerald-200`}
                  >
                    Facts
                  </div>
                )}
                <div
                  onClick={arrowNavigationRight}
                  className={`inline py-2.5 p-0 m-0 px-1 hover:bg-gray-800 hover:text-emerald-200 rounded-r-2xl`}
                >
                  <IoIosArrowForward />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navigator;
