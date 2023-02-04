import { createContext, useState, useEffect, useContext } from "react";
import { LightDarkInterface } from "../interfaces/LightDark";
import localforage from "localforage";

type LightDarkContextInterface = {
  lightDark: LightDarkInterface;
  toggleLightDark(): void;
};

const LightDarkContext = createContext<LightDarkContextInterface | null>(null);

export const LightDarkProvider = ({ children }: { children: JSX.Element }) => {
  const [lightDark, setLightDark] = useState<LightDarkInterface>({
    isDarkMode: false,
  });

  useEffect(() => {
    localforage
      .getItem(`lightDark`)
      .then((res: any) => {
        if (res) {
          if (res.isDarkMode != lightDark.isDarkMode) {
            setLightDark({ isDarkMode: res.isDarkMode });
          }
        }
      })
      .catch((err: any) => {});
  }, []);

  useEffect(() => {
    localforage.setItem(`lightDark`, lightDark);
  }, [lightDark]);

  const toggleLightDark = (): void => {
    setLightDark((prevSideNav: LightDarkInterface) => {
      return {
        ...prevSideNav,
        isDarkMode: !prevSideNav.isDarkMode,
      };
    });
  };

  return (
    <LightDarkContext.Provider
      value={{
        lightDark,
        toggleLightDark,
      }}
    >
      {children}
    </LightDarkContext.Provider>
  );
};

export const useLightDark = () => {
  return useContext(LightDarkContext);
};
