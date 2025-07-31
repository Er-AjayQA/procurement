import { useParams } from "react-router-dom";
import { moduleComponents } from "../Utils/moduleRoutesConfig";

export const ModulePage = () => {
  const { module, submodule } = useParams();

  const Component = moduleComponents[module]?.[submodule];
  console.log(Component);

  return <Component />;
};
