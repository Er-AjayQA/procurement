import { useEntityConfigContext } from "../../../../contextApis/useEntityContextFile";

export const EntityBasicDetails = () => {
  const { data } = useEntityConfigContext();
  return (
    <>
      <div className="flex flex-col gap-5">
        {/* Entity Basic Details */}
        <div className="flex flex-col gap-3 basis-[100%]">
          <div className="bg-button-hover py-2 px-1 rounded-t-md">
            <h3 className="text-white text-xs">Basic Information</h3>
          </div>
          <div className="grid grid-cols-3 gap-5 basis-[100%] justify-around shadow-lg rounded-md px-3 pb-4">
            <div className="flex flex-col gap-2 justify-center">
              <label className="text-[.8rem]">Entity Code</label>
              <p className="text-[.7rem]">{data?.entity_code || "N/A"}</p>
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <label className="text-[.8rem]">Entity Name</label>
              <p className="text-[.7rem]">{data?.entity_name || "N/A"}</p>
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <label className="text-[.8rem]">Displayed Name</label>
              <p className="text-[.7rem]">{data?.display_name || "N/A"}</p>
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <label className="text-[.8rem]">Entity Code Prefix</label>
              <p className="text-[.7rem]">
                {data?.entity_code_prefix || "N/A"}
              </p>
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <label className="text-[.8rem]">Entity Type</label>
              <p className="text-[.7rem]">{data?.entity_type || "N/A"}</p>
            </div>
          </div>
        </div>

        {/* Entity SMTP Details */}
        <div className="flex flex-col gap-3 basis-[100%]">
          <div className="bg-button-hover py-2 px-1 rounded-t-md">
            <h3 className="text-white text-xs">SMTP Details</h3>
          </div>
          <div className="grid grid-cols-3 gap-5 basis-[100%] justify-around shadow-lg rounded-md px-3 pb-4">
            <div className="flex flex-col gap-2 justify-center">
              <label className="text-[.8rem]">Server Address</label>
              <p className="text-[.7rem]">
                {data?.smtp_server_address || "N/A"}
              </p>
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <label className="text-[.8rem]">Port no.</label>
              <p className="text-[.7rem]">{data?.smtp_port_no || "N/A"}</p>
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <label className="text-[.8rem]">Username</label>
              <p className="text-[.7rem]">{data?.username || "N/A"}</p>
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <label className="text-[.8rem]">Password</label>
              <p className="text-[.7rem]">{data?.password || "N/A"}</p>
            </div>
          </div>
        </div>

        {/* Entity Communication Details */}
        <div className="flex flex-col gap-3 basis-[100%]">
          <div className="bg-button-hover py-2 px-1 rounded-t-md">
            <h3 className="text-white text-xs">Communication Details</h3>
          </div>
          <div className="grid grid-cols-3 gap-5 basis-[100%] justify-around shadow-lg rounded-md px-3 pb-4">
            <div className="flex flex-col gap-2 justify-center">
              <label className="text-[.8rem]">Email Domain</label>
              <p className="text-[.7rem]">{data?.email_domain || "N/A"}</p>
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <label className="text-[.8rem]">Email Signature</label>
              <p className="text-[.7rem]">{data?.email_signature || "N/A"}</p>
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <label className="text-[.8rem]">Contact no.</label>
              <p className="text-[.7rem]">
                {data?.contact_country_code
                  ? `${data?.contact_country_code}-${data?.contact_no}`
                  : "N/A"}
              </p>
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <label className="text-[.8rem]">Default Time Zone</label>
              <p className="text-[.7rem]">{data?.default_time_zone || "N/A"}</p>
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <label className="text-[.8rem]">Business Hours</label>
              <p className="text-[.7rem]">{data?.business_hours || "N/A"}</p>
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <label className="text-[.8rem]">Local</label>
              <p className="text-[.7rem]">{data?.local_currency || "N/A"}</p>
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <label className="text-[.8rem]">Tax/Vat Number</label>
              <p className="text-[.7rem]">{data?.tax_info || "N/A"}</p>
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <label className="text-[.8rem]">Preferred Language</label>
              <p className="text-[.7rem]">
                {data?.language_preference || "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* Entity Regional Details */}
        <div className="flex flex-col gap-3 basis-[100%]">
          <div className="bg-button-hover py-2 px-1 rounded-t-md">
            <h3 className="text-white text-xs">Regional Details</h3>
          </div>
          <div className="grid grid-cols-3 gap-5 basis-[100%] justify-around shadow-lg rounded-md px-3 pb-4">
            <div className="flex flex-col gap-2 justify-center">
              <label className="text-[.8rem]">Preferred Date Format</label>
              <p className="text-[.7rem]">{data?.date_format || "N/A"}</p>
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <label className="text-[.8rem]">Preferred Time Format</label>
              <p className="text-[.7rem]">{data?.time_format || "N/A"}</p>
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <label className="text-[.8rem]">Date-Time Format</label>
              <p className="text-[.7rem]">{data?.date_time_format || "N/A"}</p>
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <label className="text-[.8rem]">Thousand Separator</label>
              <p className="text-[.7rem]">
                {data?.thousand_separator || "N/A"}
              </p>
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <label className="text-[.8rem]">Decimal Separator</label>
              <p className="text-[.7rem]">{data?.decimal_separator || "N/A"}</p>
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <label className="text-[.8rem]">Currency Symbol</label>
              <p className="text-[.7rem]">{data?.currency_symbol || "N/A"}</p>
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <label className="text-[.8rem]">Currency Symbol Position</label>
              <p className="text-[.7rem]">
                {data?.currency_symbol_position || "N/A"}
              </p>
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <label className="text-[.8rem]">No. of Decimals Digit</label>
              <p className="text-[.7rem]">{data?.number_of_decimal || "N/A"}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
