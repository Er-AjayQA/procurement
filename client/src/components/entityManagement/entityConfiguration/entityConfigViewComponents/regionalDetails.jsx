import { useEntityConfigContext } from "../../../../contextApis/useEntityContextFile";

export const EntityRegionalDetails = () => {
  const { data } = useEntityConfigContext();
  return (
    <>
      <p>Employee Document Details</p>
    </>
  );
};
