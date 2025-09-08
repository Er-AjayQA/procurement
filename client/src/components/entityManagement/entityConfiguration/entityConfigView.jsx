import { useEntityConfigContext } from "../../../contextApis/useEntityContextFile";
import { EntityBasicDetails } from "./entityConfigViewComponents/basicDetails";

export const EntityConfigView = () => {
  const { setData, setViewId, handleTabClick, handleComponentView } =
    useEntityConfigContext();

  return (
    <>
      <div className="flex flex-col">
        {/* Entity Profile */}
        <div className="flex flex-col pt-2 border-b border-b-gray-200">
          <div className="flex justify-between gap-3 items-center mb-2">
            <div className="flex items-center gap-3">
              <div className="flex justify-between w-[5rem] h-[5rem] rounded-[50%] overflow-hidden">
                <img
                  src="/Images/dummy_userProfile.png"
                  alt="user-profile-image"
                />
              </div>
            </div>
            <div>
              <button
                className="bg-red-600 py-1 px-5 rounded-lg text-white hover:bg-red-700 text-sm font-bold"
                onClick={() => {
                  handleComponentView("listing");
                  setData(null);
                  setViewId(null);
                  handleTabClick("basic_details");
                }}
              >
                Back
              </button>
            </div>
          </div>
        </div>

        {/* Entity Details Form */}
        <div className="py-5">{<EntityBasicDetails />}</div>
      </div>
    </>
  );
};
