import { MdDelete, MdEdit } from "react-icons/md";
import { FamilyDetailsAddItem } from "./familyDetailsAddForm";
import { FamilyDetailsViewItem } from "./familyDetailsViewForm";
import { FaEye } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";

export const FamilyDetailsSection = ({
  register,
  errors,
  control,
  setFamilyFormVisible,
  familyDetails,
  handleFamilyViewData,
  setFamilyFormView,
  setFamilyEditData,
  handleFamilyDetailsEdit,
  handleFamilyDetailsRemove,
  familyFormVisible,
  handleAddFamilyDetails,
  familyEditData,
  familyFormView,
  setFamilyViewData,
  familyViewData,
}) => {
  return (
    <>
      <div className="shadow-lg rounded-md">
        <div className="bg-button-hover py-2 px-1 rounded-t-md flex justify-between">
          <h3 className="text-white text-xs">Family Details</h3>
          <button
            type="button"
            onClick={() => setFamilyFormVisible(true)}
            className="text-white hover:text-gray-200 flex items-center text-xs"
          >
            <IoMdAdd className="mr-1 fill-white hover:fill-gray-200" /> Add
            Family Details
          </button>
        </div>

        {familyDetails?.length > 0 ? (
          <div className="border border-gray-200 rounded-md overflow-hidden">
            <div className="grid grid-cols-8 bg-gray-50 border-b border-gray-200 text-xs text-gray-500 font-bold">
              <div className="p-2 text-xs font-bold">S.No.</div>
              <div className="p-2 text-xs font-bold">Member Name</div>
              <div className="p-2 text-xs font-bold">DOB</div>
              <div className="p-2 text-xs font-bold text-center">
                Relation Type
              </div>
              <div className="p-2 text-xs font-bold text-center">
                Contact Number
              </div>
              <div className="p-2 text-xs font-bold text-center">Remark</div>
              <div className="p-2 text-xs font-bold text-center">
                Emergency Contact
              </div>
              <div className="p-2 text-xs font-bold text-center">Action</div>
            </div>
            {familyDetails.map((family, index) => (
              <div
                key={index}
                className="grid grid-cols-8 border-b border-gray-200"
              >
                <div className="p-2 text-xs">{index + 1}</div>
                <div className="p-2 text-xs">{family?.member_name}</div>
                <div className="p-2 text-xs">{family?.dob}</div>
                <div className="p-2 text-xs">{family?.relation_type}</div>
                <div className="p-2 text-xs">{family?.contact_number}</div>
                <div className="p-2 text-xs">{family?.remark}</div>
                <div className="p-2 text-xs text-center">
                  {family?.selected_as_emergency ? (
                    <span className="text-green-500 text-xs">Yes</span>
                  ) : (
                    <span className="text-red-500 text-xs">No</span>
                  )}
                </div>
                <div className="p-2 flex justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      handleFamilyViewData(index);
                      setFamilyFormView(true);
                    }}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <FaEye className="text-xl" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setFamilyEditData(familyDetails[index]);
                      setFamilyFormVisible(true);
                      handleFamilyDetailsEdit(index);
                    }}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <MdEdit className="text-xl" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFamilyDetailsRemove(index)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <MdDelete className="text-xl" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="border border-gray-200 rounded-md p-4 text-center text-sm text-gray-500">
            No details yet
          </div>
        )}
      </div>

      {/* Family Details Form Modal */}
      <FamilyDetailsAddItem
        isVisible={familyFormVisible}
        onClose={() => {
          setFamilyEditData(null);
          setFamilyFormVisible(false);
        }}
        onAddFamilyRow={handleAddFamilyDetails}
        updateData={familyEditData}
        register={register}
        errors={errors}
        control={control}
      />

      {/* Family Details View Form Modal */}
      <FamilyDetailsViewItem
        isView={familyFormView}
        onClose={() => {
          setFamilyViewData(null);
          setFamilyFormView(false);
        }}
        viewData={familyViewData}
      />
    </>
  );
};
