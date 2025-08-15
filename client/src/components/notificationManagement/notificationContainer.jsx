import { MdOutlineClose } from "react-icons/md";
import { useNotificationContext } from "../../contextApis/useNotificationContextFile";
import { NotificationListing } from "./notificationListing";

export const NotificationContainer = ({ onClose }) => {
  const { notificationVisibity } = useNotificationContext();
  return (
    <>
      <div
        className={`fixed inset-0 z-20 transition-opacity backdrop-blur-sm bg-[#0202025b] ${
          notificationVisibity ? "block pointer-events-none" : "hidden"
        }`}
        onClick={onClose}
      ></div>
      <div
        className={`fixed right-0 top-0 w-full max-w-md h-full bg-white z-30 shadow-xl transition-transform duration-300 rounded-t-md  ${
          notificationVisibity ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="haze_purple py-2 ps-3 pe-1 rounded-t-md flex justify-between items-center relative z-30">
          <h3 className="text-white text-sm font-bold">Notifications</h3>
          <div
            onClick={onClose}
            className="hover:bg-red-500 p-2 rounded-lg hover:fill-white"
          >
            <MdOutlineClose className="fill-white" />
          </div>
        </div>
        <NotificationListing />
      </div>
    </>
  );
};
