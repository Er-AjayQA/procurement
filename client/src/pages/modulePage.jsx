import { useParams } from "react-router-dom";
import { moduleComponents } from "../Utils/moduleRoutesConfig";
import { PageNotFound } from "./pageNotFound";

export const ModulePage = () => {
  const { module, submodule } = useParams();

  const Component = moduleComponents[module]?.[submodule];

  if (!Component) {
    return <PageNotFound />;
  }

  return <Component />;
};
