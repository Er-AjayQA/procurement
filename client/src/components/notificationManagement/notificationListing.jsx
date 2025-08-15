import { useState } from "react";
import { useNotificationContext } from "../../contextApis/useNotificationContextFile";
import { DeleteIcon } from "../UI/deleteIcon";

export const NotificationListing = () => {
  const { listing, viewId, setViewId, setDeleteId } = useNotificationContext();

  return (
    <>
      <div className="py-3 px-2 flex flex-col gap-5">
        {listing && listing.length > 0 ? (
          listing.map((item) => {
            return (
              <div
                className="shadow-sm hover:shadow-md rounded-lg"
                onClick={() => {
                  setViewId((prev) => (prev !== item?.id ? item?.id : null));
                }}
              >
                <div
                  key={item?.id}
                  className="border-b border-b-gray-300 cursor-pointer flex items-center ps-3 pe-10 py-5"
                >
                  <div className="flex-grow">
                    <p
                      className={`${
                        item?.isReaded ? "text-gray-500" : "text-gray-950"
                      }`}
                    >
                      {item?.title}
                    </p>
                  </div>
                  <div className="w-[20px] h-[20px] flex items-center justify-center">
                    <DeleteIcon onClick={() => setDeleteId(item?.id)} />
                  </div>
                </div>
                {/* Message Container */}
                <div
                  className={`transition-all duration-500 overflow-hidden ${
                    viewId === item?.id ? "max-h-[500px]" : "max-h-0"
                  }`}
                >
                  <div className="p-5">
                    <p className="text-sm">{item?.message}</p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div>
            <p className="text-center text-sm">No Records Found!</p>
          </div>
        )}
      </div>
    </>
  );
};
