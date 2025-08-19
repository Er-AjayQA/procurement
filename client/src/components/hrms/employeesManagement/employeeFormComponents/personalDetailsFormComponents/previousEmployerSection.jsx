import { MdDelete, MdEdit } from "react-icons/md";
import { FamilyDetailsAddItem } from "./familyDetailsAddForm";
import { FamilyDetailsViewItem } from "./familyDetailsViewForm";
import { FaEye } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { PreviousEmployerDetailsViewItem } from "./previousEmployerDetailsViewForm";
import { PreviousEmployerDetailsAddItem } from "./previousEmployerDetailsAddForm";

export const PreviousEmployerSection = ({
  register,
  errors,
  control,
  previousEmployerFormVisible,
  setPreviousEmployerFormVisible,
  previousEmployerFormView,
  setPreviousEmployerFormView,
  handleFamilyDetailsRemove,
  previousEmployerDetails,
  handleAddFamilyDetails,
  previousEmployerEditData,
  setPreviousEmployerEditData,
  handlePreviousEmployerDetailsEdit,
  previousEmployerViewData,
  setPreviousEmployerViewData,
  handlePreviousEmployerViewData,
}) => {
  return (
    <>
      <div className="shadow-lg rounded-md">
        <div className="bg-button-hover py-2 px-1 rounded-t-md flex justify-between">
          <h3 className="text-white text-xs">Previous Employer Details</h3>
          <button
            type="button"
            onClick={() => setPreviousEmployerFormVisible(true)}
            className="text-white hover:text-gray-200 flex items-center text-xs"
          >
            <IoMdAdd className="mr-1 fill-white hover:fill-gray-200" /> Add
            Previous Employer Details
          </button>
        </div>

        {previousEmployerDetails?.length > 0 ? (
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
            {previousEmployerDetails.map((employer, index) => (
              <div
                key={index}
                className="grid grid-cols-8 border-b border-gray-200"
              >
                <div className="p-2 text-xs">{index + 1}</div>
                <div className="p-2 text-xs">{employer?.member_name}</div>
                <div className="p-2 text-xs">{employer?.dob}</div>
                <div className="p-2 text-xs">{employer?.relation_type}</div>
                <div className="p-2 text-xs">{employer?.contact_number}</div>
                <div className="p-2 text-xs">{employer?.remark}</div>
                <div className="p-2 text-xs text-center">
                  {employer?.selected_as_emergency ? (
                    <span className="text-green-500 text-xs">Yes</span>
                  ) : (
                    <span className="text-red-500 text-xs">No</span>
                  )}
                </div>
                <div className="p-2 flex justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      handlePreviousEmployerViewData(index);
                      setPreviousEmployerFormView(true);
                    }}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <FaEye className="text-xl" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPreviousEmployerEditData(employer[index]);
                      setPreviousEmployerFormVisible(true);
                      handlePreviousEmployerDetailsEdit(index);
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
            No Records Found
          </div>
        )}
      </div>

      {/* Previous Employer Form Modal */}
      <PreviousEmployerDetailsAddItem
        isVisible={previousEmployerFormVisible}
        onClose={() => {
          setPreviousEmployerEditData(null);
          setPreviousEmployerFormVisible(false);
        }}
        onAddFamilyRow={handleAddFamilyDetails}
        updateData={previousEmployerEditData}
        register={register}
        errors={errors}
        control={control}
      />

      {/* Previous Employer View Form Modal */}
      <PreviousEmployerDetailsViewItem
        isView={previousEmployerFormView}
        onClose={() => {
          setPreviousEmployerViewData(null);
          setPreviousEmployerFormView(false);
        }}
        viewData={previousEmployerViewData}
      />
    </>
  );
};
