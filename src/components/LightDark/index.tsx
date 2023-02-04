import { FaSun, FaMoon, FaRegMoon, FaRegSun } from "react-icons/fa";
import { useLightDark } from "../../contexts/LightDark";

const LightDark = () => {
  const lightDarkContext = useLightDark();

  return (
    <div className={`absolute bottom-2 left-2 z-10`}>
      <div className={`flex flex-row rounded-2xl`}>
        {!lightDarkContext?.lightDark.isDarkMode ? (
          <div
            onClick={() => lightDarkContext?.toggleLightDark()}
            className="basis-1/2 text-center font-semibold text-3xl d-inline px-2 py-1 bg-gray-800 text-emerald-300 border-2 border-emerald-300 rounded-l-2xl"
          >
            <FaSun />
          </div>
        ) : (
          <div
            onClick={() => lightDarkContext?.toggleLightDark()}
            className="basis-1/2 text-center font-semibold text-3xl d-inline px-2 py-1 bg-emerald-300 text-gray-800 rounded-l-2xl"
          >
            <FaRegSun />
          </div>
        )}
        {lightDarkContext?.lightDark.isDarkMode ? (
          <div
            onClick={() => lightDarkContext?.toggleLightDark()}
            className="basis-1/2 text-center font-semibold text-3xl d-inline px-2 py-1 bg-gray-800 text-emerald-300 border-2 border-emerald-300 rounded-r-2xl"
          >
            <FaMoon />
          </div>
        ) : (
          <div
            onClick={() => lightDarkContext?.toggleLightDark()}
            className="basis-1/2 text-center font-semibold text-3xl d-inline px-2 py-1 bg-emerald-300 text-gray-800 rounded-r-2xl"
          >
            <FaRegMoon />
          </div>
        )}
      </div>
    </div>
  );
};

export default LightDark;
