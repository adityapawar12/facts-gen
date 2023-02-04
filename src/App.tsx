import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

import styles from "./App.module.css";

import Home from "./components/Home";
import DogFacts from "./components/DogFacts";
import NoMatch from "./components/NoMatch";
import { LightDarkProvider } from "./contexts/LightDark";

const App = () => {
  useEffect(() => {
    const handleResize = (e: any) => {
      e.preventDefault();
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <LightDarkProvider>
          <Routes>
            <Route path={`/`} element={<Home />} />
            <Route path={`/home`} element={<Home />} />
            <Route path={`/dog-facts`} element={<DogFacts />} />

            <Route path={`*`} element={<NoMatch />} />
          </Routes>
        </LightDarkProvider>
      </QueryClientProvider>
    </div>
  );
};

export default App;
