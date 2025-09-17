import { useProjectConfigurationsContext } from "../../../../contextApis/useProjectContextFile";

export const ProjectDescription = () => {
  const { data, formatDateTime } = useProjectConfigurationsContext();
  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="bg-button-hover py-2 px-1 rounded-t-md">
          <h3 className="text-white text-xs font-bold">Description</h3>
        </div>
        <div className="grid grid-cols-12 gap-5 basis-[80%] justify-around shadow-lg rounded-md px-3 pb-4">
          <div className="flex col-span-10 gap-2">
            <label className="text-[.8rem] hidden">Description</label>
            <p className="text-[.7rem]">{data?.project_description || "N/A"}</p>
          </div>
        </div>
      </div>
    </>
  );
};
