import { MdOutlineClose } from "react-icons/md";

export const RoleMasterForm = ({ formVisibility, onClose }) => {
  return (
    <>
      <div
        className={`fixed w-full h-full top-0 start-0 bg-[#0202025b] z-20 ${
          formVisibility ? "block" : "hidden"
        }`}
      ></div>
      <div
        className={`absolute top-0 start-[50%] w-[50%] translate-x-[-50%] bg-white z-30 min-h-[60%] shadow-lg rounded-lg transition-all duration-[.4s] origin-top ${
          formVisibility ? "scale-1" : "scale-0"
        }`}
      >
        <div className="bg-button-hover py-2 px-1 rounded-t-md flex justify-between items-center">
          <h3 className="text-white text-xs">Roles Listing</h3>
          {/* Form Close Button */}
          <div
            className="hover:bg-red-500 p-2 rounded-lg hover:fill-white"
            onClick={onClose}
          >
            <MdOutlineClose className="fill-white" />
          </div>
        </div>

        {/* Form */}
        <div className="w-[50%] absolute top-[50%] start-[50%] translate-x-[-50%] translate-y-[-50%]">
          <form>
            <div className="flex flex-col">
              <label htmlFor="name">Name</label>
              <input type="text" />
            </div>
            <div>
              <button>Submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
