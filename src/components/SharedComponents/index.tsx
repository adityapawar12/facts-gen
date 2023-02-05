import LightDark from "../LightDark";
import Navigator from "../Navigator";

type SharedComponentsType = {
  showLightDarkComp: boolean;
  showNavigator: boolean;
};
const SharedComponents = ({
  showLightDarkComp,
  showNavigator,
}: SharedComponentsType) => {
  return (
    <>
      {showLightDarkComp ? <LightDark /> : null}
      {showNavigator ? <Navigator /> : null}
    </>
  );
};

export default SharedComponents;
