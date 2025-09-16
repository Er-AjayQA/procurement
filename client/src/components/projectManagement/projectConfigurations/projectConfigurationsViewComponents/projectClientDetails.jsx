import { useProjectConfigurationsContext } from "../../../../contextApis/useProjectContextFile";

export const ProjectClientDetails = () => {
  const { data, formatDateTime } = useProjectConfigurationsContext();
  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="bg-button-hover py-2 px-1 rounded-t-md">
          <h3 className="text-white text-xs">Client Details</h3>
        </div>
        <div className="grid grid-cols-3 gap-5 basis-[80%] justify-around shadow-lg rounded-md px-3 pb-4">
          <div className="flex flex-col gap-2 justify-center">
            <label className="text-[.8rem]">Name</label>
            <p className="text-[.7rem]">{data?.client_name || "N/A"}</p>
          </div>
          <div className="flex flex-col gap-2 justify-center">
            <label className="text-[.8rem]">Email</label>
            <p className="text-[.7rem]">{data?.client_email || "N/A"}</p>
          </div>
          <div className="flex flex-col gap-2 justify-center">
            <label className="text-[.8rem]">Contact Person</label>
            <p className="text-[.7rem]">
              {data?.client_contact_person || "N/A"}
            </p>
          </div>
          <div className="flex flex-col gap-2 justify-center">
            <label className="text-[.8rem]">Contact No.</label>
            <p className="text-[.7rem]">
              {data?.client_contact_no
                ? `${data?.client_contact_country_code}-${data?.client_contact_no}`
                : "N/A"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
