import { useEmployeeIdCardContext } from "../../../contextApis/useHrmsContextFile";

export const EmployeeIdCardView = ({ onClose }) => {
  const { viewVisibility, data } = useEmployeeIdCardContext();

  console.log(data);

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
          <div className="col-span-6 shadow-md w-[70%] mx-auto border border-gray-400 rounded-md flex flex-col gap-10">
            {/* User Basic Info */}
            <div className="h-[300px] w-[90%] mx-auto bg-black rounded-b-[50px] flex flex-col gap-3 py-5 px-5">
              {/* Company Name */}
              <div className="flex justify-center items-center">
                <p className="text-white">Company Name</p>
              </div>

              {/* Image */}
              <div className="w-[150px] h-[150px] overflow-hidden rounded-[50%] p-2 bg-white mx-auto flex items-center justify-center">
                <div className="w-[130px] h-[130px] overflow-hidden rounded-[50%]">
                  <img
                    src={`${
                      data?.userImage
                        ? data?.userImage
                        : "/Images/dummy_userProfile.png"
                    }`}
                    alt="user-image"
                  />
                </div>
              </div>

              {/* Employee Name */}
              <div>
                <p className="text-center text-xl font-bold text-white">
                  {data?.name}
                </p>
              </div>

              {/* Employee Designation */}
              <div>
                <p className="text-center text-xs text-white">
                  {data?.designation.toUpperCase()}
                </p>
              </div>
            </div>

            {/* User Profile Information */}
            <div className="flex flex-col gap-2 px-5">
              <div className="grid grid-cols-12 gap-5">
                <div className="col-span-4 text-left ps-5">
                  <p className="text-sm font-bold">Emp Code</p>
                </div>
                <div className="col-span-1">:</div>
                <div className="col-span-7">
                  <p className="text-xs">{data?.emp_id}</p>
                </div>
              </div>
              <div className="grid grid-cols-12 gap-5">
                <div className="col-span-4 text-left ps-5">
                  <p className="text-sm font-bold">D.O.B</p>
                </div>
                <div className="col-span-1">:</div>
                <div className="col-span-7">
                  <p className="text-xs">{data?.dob}</p>
                </div>
              </div>
              <div className="grid grid-cols-12 gap-5">
                <div className="col-span-4 text-left ps-5">
                  <p className="text-sm font-bold">Blood Gp.</p>
                </div>
                <div className="col-span-1">:</div>
                <div className="col-span-7">
                  <p className="text-xs">{data?.blood_group}</p>
                </div>
              </div>
              <div className="grid grid-cols-12 gap-5">
                <div className="col-span-4 text-left ps-5">
                  <p className="text-sm font-bold">Mobile No.</p>
                </div>
                <div className="col-span-1">:</div>
                <div className="col-span-7">
                  <p className="text-xs">{data?.contact_no}</p>
                </div>
              </div>
              <div className="grid grid-cols-12 gap-5">
                <div className="col-span-4 text-left ps-5">
                  <p className="text-sm font-bold">Email</p>
                </div>
                <div className="col-span-1">:</div>
                <div className="col-span-7">
                  <p className="text-xs">{data?.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-12 gap-5">
                <div className="col-span-4 text-left ps-5">
                  <p className="text-sm font-bold">Address</p>
                </div>
                <div className="col-span-1">:</div>
                <div className="col-span-7">
                  <p className="text-xs">{data?.address}</p>
                </div>
              </div>
            </div>

            {/* OR/Bar Code */}

            {/* Border Bottom */}
            <div className="w-full h-[30px] mt-auto bg-rose-300"></div>
          </div>

          {/* Back */}
          <div className="col-span-6 shadow-md w-[70%] mx-auto border border-gray-400 rounded-md flex flex-col gap-10">
            {/* Header */}
            <div className="h-[150px] w-[90%] mx-auto bg-rose-300 rounded-b-[50px] flex flex-col gap-3 py-5">
              {/* Company Name */}
              <div className="flex justify-center items-center">
                <p className="text-white text-2xl font-bold">Company Name</p>
              </div>

              {/* Emp Code */}
              <div className="flex items-center justify-center gap-5 w-[70%] mx-auto py-2 px-1 bg-yellow-700 rounded-[50px]">
                <div className=" text-left">
                  <p className="text-sm text-white font-bold">Emp Code</p>
                </div>
                <div className="text-white">:</div>
                <div className="">
                  <p className="text-xs text-white">{data?.emp_id}</p>
                </div>
              </div>
            </div>

            {/* User Profile Information */}
            <div className="flex flex-col justify-center gap-2 px-5">
              <div className="grid grid-cols-12 gap-5 w-[80%] mx-auto">
                <div className="col-span-5 ps-5 text-left">
                  <p className="text-sm font-bold">Join Date</p>
                </div>
                <div className="col-span-1">:</div>
                <div className="col-span-6">
                  <p className="text-xs">
                    {data?.join_date.replaceAll("-", "/")}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-12 gap-5 w-[80%] mx-auto">
                <div className="col-span-5 text-left ps-5">
                  <p className="text-sm font-bold">Expire Date</p>
                </div>
                <div className="col-span-1">:</div>
                <div className="col-span-6">
                  <p className="text-xs">{data?.dob.replaceAll("-", "/")}</p>
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
