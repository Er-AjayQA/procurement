import { useRegisteredEventsContext } from "../../../../contextApis/useEventContextFile";

export const EventRegistrationDetails = () => {
  const { data, formatDateTime } = useRegisteredEventsContext();
  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="bg-button-hover py-2 px-1 rounded-t-md">
          <h3 className="text-white text-xs">Registration Details</h3>
        </div>
        <div className="grid grid-cols-3 gap-5 basis-[80%] justify-around shadow-lg rounded-md px-3 pb-4">
          <div className="flex flex-col gap-2 justify-center">
            <label className="text-[.8rem]">Registration Required</label>
            <p className="text-[.7rem]">{data?.is_paid ? "Yes" : "No"}</p>
          </div>
          <div className="flex flex-col gap-2 justify-center">
            <label className="text-[.8rem]">Sitting Type</label>
            <p className="text-[.7rem]">{data?.sitting_type || "N/A"}</p>
          </div>
          <div className="flex flex-col gap-2 justify-center">
            <label className="text-[.8rem]">Sitting Capacity</label>
            <p className="text-[.7rem]">{data?.sitting_capacity || "N/A"}</p>
          </div>
          <div className="flex flex-col gap-2 justify-center">
            <label className="text-[.8rem]">Ticket Base Price</label>
            <p className="text-[.7rem]">{data?.base_ticket_price || "N/A"}</p>
          </div>
          <div className="flex flex-col gap-2 justify-center">
            <label className="text-[.8rem]">Registration Deadline</label>
            <p className="text-[.7rem]">
              {data?.base_ticket_price
                ? formatDateTime(data?.registration_deadline)
                : "N/A"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
