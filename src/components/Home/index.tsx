import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <div
        className={`flex flex-col justify-center align-middle items-center bg-gray-800 h-screen`}
      >
        <div className={`basis-auto my-2`}>
          <h1 className={`text-8xl font-thin text-slate-200`}>
            Facts Generator
          </h1>
        </div>
        <div className={`basis-auto my-4`}>
          <button
            className={`p-2 text-xl font-bold rounded-xl text-gray-800 bg-slate-200`}
            onClick={() => {
              navigate("/dog-facts");
            }}
          >
            Generate Dog Facts
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
