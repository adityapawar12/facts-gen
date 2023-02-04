import { useNavigate } from "react-router-dom";
import { useLightDark } from "../../contexts/LightDark";
import SharedComponents from "../SharedComponents";

const Home = () => {
  const navigate = useNavigate();
  const lightDarkContext = useLightDark();

  return (
    <>
      <SharedComponents showLightDarkComp={true} />
      {lightDarkContext?.lightDark.isDarkMode ? (
        <div
          className={`flex flex-col justify-center align-middle items-center text-emerald-200 bg-gray-800 h-screen`}
        >
          <div className={`basis-auto my-2`}>
            <h1 className={`text-8xl font-thin`}>Facts Generator</h1>
          </div>
          <div className={`basis-auto my-4`}>
            <button
              className={`p-2 text-xl font-bold rounded-xl text-gray-800 bg-emerald-200`}
              onClick={() => {
                navigate("/dog-facts");
              }}
            >
              Generate Dog Facts
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`flex flex-col justify-center align-middle items-center bg-emerald-200 text-gray-800 h-screen`}
        >
          <div className={`basis-auto my-2`}>
            <h1 className={`text-8xl font-thin `}>Facts Generator</h1>
          </div>
          <div className={`basis-auto my-4`}>
            <button
              className={`p-2 text-xl font-bold rounded-xl text-emerald-200 bg-gray-800`}
              onClick={() => {
                navigate("/dog-facts");
              }}
            >
              Generate Dog Facts
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
