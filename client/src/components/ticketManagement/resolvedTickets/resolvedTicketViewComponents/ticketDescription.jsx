import { useResolvedTicketsContext } from "../../../../contextApis/useTicketContextFile";

export const TicketDescription = () => {
  const { data } = useResolvedTicketsContext();
  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="bg-button-hover py-2 px-1 rounded-t-md">
          <h3 className="text-white text-xs">Description</h3>
        </div>
        <div className="grid grid-cols-12 gap-5 basis-[80%] justify-around shadow-lg rounded-md px-3 pb-4">
          <div className="col-span-10 flex flex-col gap-2 justify-center">
            {/* <label className="text-[.8rem]">Description</label> */}
            <p className="text-[.7rem]">
              {data?.ticket_description ? `${data?.ticket_description}` : "N/A"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
