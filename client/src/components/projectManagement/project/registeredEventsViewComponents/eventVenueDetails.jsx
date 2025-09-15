import { useRegisteredEventsContext } from "../../../../contextApis/useEventContextFile";

export const EventVenueDetails = () => {
  const { data, formatDateTime } = useRegisteredEventsContext();
  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="bg-button-hover py-2 px-1 rounded-t-md">
          <h3 className="text-white text-xs">Venue Details</h3>
        </div>
        <div className="grid grid-cols-3 gap-5 basis-[80%] justify-around shadow-lg rounded-md px-3 pb-4">
          <div className="flex flex-col gap-2 justify-center">
            <label className="text-[.8rem]">Organizer Name</label>
            <p className="text-[.7rem]">
              {data?.event_organizer_id
                ? `${data?.organizer_name_title} ${data?.organizer_name}`
                : "N/A"}
            </p>
          </div>
          <div className="flex flex-col gap-2 justify-center">
            <label className="text-[.8rem]">Organizer Contact No.</label>
            <p className="text-[.7rem]">
              {data?.event_organizer_id
                ? `${data?.organizer_contact_code}-${data?.organizer_contact_no}`
                : "N/A"}
            </p>
          </div>
          <div className="flex flex-col gap-2 justify-center">
            <label className="text-[.8rem]">Venue Name</label>
            <p className="text-[.7rem]">{data?.venue_name || "N/A"}</p>
          </div>
          <div className="flex flex-col gap-2 justify-center">
            <label className="text-[.8rem]">Country</label>
            <p className="text-[.7rem]">{data?.country_name || "N/A"}</p>
          </div>
          <div className="flex flex-col gap-2 justify-center">
            <label className="text-[.8rem]">State</label>
            <p className="text-[.7rem]">{data?.state_name || "N/A"}</p>
          </div>
          <div className="flex flex-col gap-2 justify-center">
            <label className="text-[.8rem]">City</label>
            <p className="text-[.7rem]">{data?.city_name || "N/A"}</p>
          </div>
          <div className="flex flex-col gap-2 justify-center">
            <label className="text-[.8rem]">Postal Code</label>
            <p className="text-[.7rem]">{data?.zip_code || "N/A"}</p>
          </div>
          <div className="flex flex-col gap-2 justify-center">
            <label className="text-[.8rem]">Full Address</label>
            <p className="text-[.7rem]">{data?.event_address || "N/A"}</p>
          </div>
        </div>
      </div>
    </>
  );
};
