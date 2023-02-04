import LightDark from "../LightDark";

type SharedComponentsType = {
  showLightDarkComp: boolean;
};
const SharedComponents = ({ showLightDarkComp }: SharedComponentsType) => {
  return <>{showLightDarkComp ? <LightDark /> : null}</>;
};

export default SharedComponents;
