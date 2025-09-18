import { useProjectConfigurationsContext } from "../../../../contextApis/useProjectContextFile";

export const ProjectBasicDetails = () => {
  const { data, formatDateTime } = useProjectConfigurationsContext();
  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="bg-button-hover py-2 px-1 rounded-t-md">
          <h3 className="text-white text-xs font-bold">Basic Details</h3>
        </div>
        <div className="grid grid-cols-3 gap-5 basis-[80%] justify-around shadow-lg rounded-md px-3 pb-4">
          <div className="flex flex-col gap-2 justify-center">
            <label className="text-[.8rem]">Code</label>
            <p className="text-[.7rem]">{data?.project_code || "N/A"}</p>
          </div>
          <div className="flex flex-col gap-2 justify-center">
            <label className="text-[.8rem]">Title</label>
            <p className="text-[.7rem]">{data?.project_title || "N/A"}</p>
          </div>
          <div className="flex flex-col gap-2 justify-center">
            <label className="text-[.8rem]">Development Mode</label>
            <p className="text-[.7rem]">{data?.development_mode || "N/A"}</p>
          </div>
          <div className="flex flex-col gap-2 justify-center">
            <label className="text-[.8rem]">Started From</label>
            <p className="text-[.7rem]">
              {data?.project_start_date
                ? formatDateTime(data?.project_start_date)
                : "N/A"}
            </p>
          </div>
          <div className="flex flex-col gap-2 justify-center">
            <label className="text-[.8rem]">Targeted End Date</label>
            <p className="text-[.7rem]">
              {data?.target_end_date
                ? formatDateTime(data?.target_end_date)
                : "N/A"}
            </p>
          </div>
          <div className="flex flex-col gap-2 justify-center">
            <label className="text-[.8rem]">Project Manager</label>
            <p className="text-[.7rem]">
              {data?.project_manager_id
                ? `${data?.manager_name_title} ${data?.manager_name}`
                : "N/A"}
            </p>
          </div>
          <div className="flex flex-col gap-2 justify-center">
            <label className="text-[.8rem]">Manager Contact</label>
            <p className="text-[.7rem]">
              {data?.project_manager_id
                ? `${data?.manager_contact_code}-${data?.manager_contact_no}`
                : "N/A"}
            </p>
          </div>
          <div className="flex flex-col gap-2 justify-center">
            <label className="text-[.8rem]">Current Status</label>
            <p
              className={`text-[.7rem] font-bold ${
                (data?.status === "Draft" && "text-red-600") ||
                (data?.status === "In-Progress" && "text-blue-600") ||
                (data?.status === "Completed" && "text-green-600") ||
                (data?.status === "Delivered" && "text-yellow-600")
              }`}
            >
              {data?.status || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
