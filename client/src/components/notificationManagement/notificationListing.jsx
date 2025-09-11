import { useNotificationContext } from "../../contextApis/useNotificationContextFile";
import { DeleteIcon } from "../UI/deleteIcon";
import { useState } from "react";

export const NotificationListing = () => {
  const { listing, viewId, setViewId, setDeleteId, handleMarkAllAsRead } =
    useNotificationContext();
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = (id) => {
    setDeletingId(id);
    setTimeout(() => setDeleteId(id), 30000);
  };

  return (
    <>
      <div className="py-3 px-2 md:px-4 max-w-3xl h-[80vh] overflow-hidden mx-auto">
        <div className="h-full overflow-y-auto scrollbar-hide">
          {listing && listing.length > 0 ? (
            <div className="space-y-3">
              {listing.map((item) => (
                <div
                  key={item?.id}
                  className={`relative transition-all duration-300 ease-in-out ${
                    deletingId === item?.id
                      ? "opacity-0 scale-95"
                      : "opacity-100 scale-100"
                  }`}
                >
                  <div
                    className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden ${
                      !item?.isReaded ? "border-l-4 border-blue-700" : ""
                    }`}
                  >
                    <div
                      className={`flex items-start p-4 cursor-pointer ${
                        viewId === item?.id ? "bg-gray-50" : ""
                      }`}
                      onClick={() =>
                        setViewId((prev) =>
                          prev !== item?.id ? item?.id : null
                        )
                      }
                    >
                      <div className="flex-grow">
                        <div className="flex items-center gap-3">
                          {!item?.isReaded && (
                            <span className="w-2 h-2 rounded-full bg-blue-700 animate-pulse"></span>
                          )}
                          <p
                            className={`font-medium text-sm ${
                              item?.isReaded ? "text-gray-600" : "text-gray-900"
                            }`}
                          >
                            {item?.title}
                          </p>
                        </div>
                        {viewId !== item?.id && (
                          <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                            {item?.message}
                          </p>
                        )}
                        <p className="text-xs text-gray-400 mt-2">
                          {new Date(item?.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <button
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(item?.id);
                        }}
                        aria-label="Delete notification"
                      >
                        <DeleteIcon />
                      </button>
                    </div>

                    {/* Expanded message */}
                    <div
                      className={`transition-all duration-300 ease-in-out ${
                        viewId === item?.id
                          ? "max-h-96 opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="px-4 pb-4 pt-2 border-t border-gray-100">
                        <p className="text-gray-700 text-xs whitespace-pre-line">
                          {item?.message}
                        </p>
                        {item?.actionUrl && (
                          <a
                            href={item.actionUrl}
                            className="mt-3 inline-block px-4 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition-colors"
                          >
                            View Details
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-700">
                No notifications
              </h3>
              <p className="mt-1 text-gray-500">
                You're all caught up! Check back later for updates.
              </p>
            </div>
          )}
        </div>
      </div>
      {/* Mark All Button */}
      <div className="flex justify-end px-5">
        <button
          className="py-2 px-5 bg-button-color hover:bg-button-hover rounded-lg text-white text-sm"
          onClick={handleMarkAllAsRead}
        >
          Mark All as Read
        </button>
      </div>
    </>
  );
};
