import { useEmployeeIdCardContext } from "../../../contextApis/useHrmsContextFile";

export const EmployeeIdCardView = ({ onClose }) => {
  const { viewVisibility, data } = useEmployeeIdCardContext();

  return (
    <>
      <div className="shadow-lg rounded-md border border-gray-300  flex flex-col">
        <div className="bg-button-hover py-2 px-2 rounded-t-md">
          <h3 className="text-white text-xs font-bold">
            Employee ID Card View
          </h3>
        </div>

        {/* List Form */}
        <div className="p-3 h-[100vh] grid grid-cols-12 gap-5">
          {/* Front */}
          <div className="col-span-6 shadow-md p-5 pt-0 w-[70%] mx-auto border border-gray-400 rounded-md flex flex-col gap-10">
            {/* User Basic Info */}
            <div className="h-[300px] w-[90%] mx-auto bg-black rounded-b-[10%] flex flex-col gap-3 py-5">
              {/* Company Name */}
              <div className="flex justify-center items-center">
                <p className="text-white">Company Name</p>
              </div>

              {/* Image */}
              <div className="w-[150px] h-[150px] overflow-hidden rounded-[50%] p-2 bg-white mx-auto flex items-center justify-center">
                <div className="w-[130px] h-[130px] overflow-hidden rounded-[50%]">
                  <img src="/Images/dummy_userProfile.png" alt="user-image" />
                </div>
              </div>

              {/* Employee Name */}
              <div>
                <p className="text-center text-white">Employee Name</p>
              </div>

              {/* Employee Designation */}
              <div>
                <p className="text-center text-white">Employee Designation</p>
              </div>
            </div>

            {/* User Profile Information */}
            <div className="flex flex-col gap-2">
              <div className="grid grid-cols-12 gap-5">
                <div className="col-span-5 text-left ps-5">
                  <p>ID Number</p>
                </div>
                <div className="col-span-1">:</div>
                <div className="col-span-6">
                  <p>129378</p>
                </div>
              </div>
              <div className="grid grid-cols-12 gap-5">
                <div className="col-span-5 text-left ps-5">
                  <p>D.O.B</p>
                </div>
                <div className="col-span-1">:</div>
                <div className="col-span-6">
                  <p>26-Aug-1993</p>
                </div>
              </div>
              <div className="grid grid-cols-12 gap-5">
                <div className="col-span-5 text-left ps-5">
                  <p>Blood Group</p>
                </div>
                <div className="col-span-1">:</div>
                <div className="col-span-6">
                  <p>O +ve</p>
                </div>
              </div>
              <div className="grid grid-cols-12 gap-5">
                <div className="col-span-5 text-left ps-5">
                  <p>Mobile No.</p>
                </div>
                <div className="col-span-1">:</div>
                <div className="col-span-6">
                  <p>+91-8957489367</p>
                </div>
              </div>
              <div className="grid grid-cols-12 gap-5">
                <div className="col-span-5 text-left ps-5">
                  <p>Email</p>
                </div>
                <div className="col-span-1">:</div>
                <div className="col-span-6">
                  <p>dummy@gmail.com</p>
                </div>
              </div>
              <div className="grid grid-cols-12 gap-5">
                <div className="col-span-5 text-left ps-5">
                  <p>Address</p>
                </div>
                <div className="col-span-1">:</div>
                <div className="col-span-6">
                  <p>C-12, Janakpuri, New Delhi, 110059</p>
                </div>
              </div>
            </div>

            {/* OR/Bar Code */}
          </div>

          {/* Back */}
          <div className="col-span-6 shadow-md p-5 pt-0 w-[70%] mx-auto border border-gray-400 rounded-md flex flex-col gap-10">
            {/* User Basic Info */}
            <div className="h-[300px] w-[90%] mx-auto bg-black rounded-b-[10%] flex flex-col gap-3 py-5">
              {/* Company Name */}
              <div className="flex justify-center items-center">
                <p className="text-white">Company Name</p>
              </div>

              {/* Image */}
              <div className="w-[150px] h-[150px] overflow-hidden rounded-[50%] p-2 bg-white mx-auto flex items-center justify-center">
                <div className="w-[130px] h-[130px] overflow-hidden rounded-[50%]">
                  <img src="/Images/dummy_userProfile.png" alt="user-image" />
                </div>
              </div>

              {/* Employee Name */}
              <div>
                <p className="text-center text-white">Employee Name</p>
              </div>

              {/* Employee Designation */}
              <div>
                <p className="text-center text-white">Employee Designation</p>
              </div>
            </div>

            {/* User Profile Information */}
            <div className="flex flex-col gap-2">
              <div className="grid grid-cols-12 gap-5">
                <div className="col-span-5 text-left ps-5">
                  <p>ID Number</p>
                </div>
                <div className="col-span-1">:</div>
                <div className="col-span-6">
                  <p>129378</p>
                </div>
              </div>
              <div className="grid grid-cols-12 gap-5">
                <div className="col-span-5 text-left ps-5">
                  <p>D.O.B</p>
                </div>
                <div className="col-span-1">:</div>
                <div className="col-span-6">
                  <p>26-Aug-1993</p>
                </div>
              </div>
              <div className="grid grid-cols-12 gap-5">
                <div className="col-span-5 text-left ps-5">
                  <p>Blood Group</p>
                </div>
                <div className="col-span-1">:</div>
                <div className="col-span-6">
                  <p>O +ve</p>
                </div>
              </div>
              <div className="grid grid-cols-12 gap-5">
                <div className="col-span-5 text-left ps-5">
                  <p>Mobile No.</p>
                </div>
                <div className="col-span-1">:</div>
                <div className="col-span-6">
                  <p>+91-8957489367</p>
                </div>
              </div>
              <div className="grid grid-cols-12 gap-5">
                <div className="col-span-5 text-left ps-5">
                  <p>Email</p>
                </div>
                <div className="col-span-1">:</div>
                <div className="col-span-6">
                  <p>dummy@gmail.com</p>
                </div>
              </div>
              <div className="grid grid-cols-12 gap-5">
                <div className="col-span-5 text-left ps-5">
                  <p>Address</p>
                </div>
                <div className="col-span-1">:</div>
                <div className="col-span-6">
                  <p>C-12, Janakpuri, New Delhi, 110059</p>
                </div>
              </div>
            </div>

            {/* OR/Bar Code */}
          </div>
        </div>
      </div>
    </>
  );
};
