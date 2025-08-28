import { useEmployeeIdCardContext } from "../../../contextApis/useHrmsContextFile";
import QRCode from "react-qr-code";
import { FaDownload } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";

export const EmployeeIdCardView = ({ onClose }) => {
  const { viewVisibility, userData, handleViewVisibility, data } =
    useEmployeeIdCardContext();
  const [employeeData, setEmployeeData] = useState({});

  const printRef = useRef();

  // Handle Close Form View
  const handleCancel = () => {
    handleViewVisibility("close");
  };

  // Handle Print ID Card
  const handlePrint = () => {
    const printContent = printRef.current.innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;

    // Reload the page to restore functionality
    window.location.reload();
  };

  useEffect(() => {
    if ((data, userData)) {
      setEmployeeData({
        employee_name: `${userData?.title} ${userData?.name}`,
        employee_code: userData?.emp_code,
      });
    }
  }, [userData, data]);

  return (
    <>
      <div className="flex flex-col">
        <div className="flex justify-between items-center py-3 border-b border-gray-400">
          <div>
            <p className="text-sm font-bold">Employee ID Card</p>
          </div>
          <div className="flex justify-between items-center gap-5">
            <button
              className="w-[30px] h-[30px] hover:bg-amber-500 flex justify-center items-center p-2 rounded-lg"
              title={"Print Card"}
              onClick={handlePrint}
            >
              <FaDownload className="hover:fill-white" />
            </button>

            <button
              className="py-2 px-4 bg-red-600 rounded-md text-white text-sm hover:bg-red-700 transition-all duration=[.3s]"
              onClick={handleCancel}
            >
              Back
            </button>
          </div>
        </div>

        <div className="shadow-lg rounded-md h-[80vh] overflow-auto scrollbar-hide">
          <div className="shadow-lg rounded-md border border-gray-300  flex flex-col">
            <div className="bg-button-hover py-2 px-2 rounded-t-md">
              <h3 className="text-white text-xs font-bold">
                Employee ID Card View
              </h3>
            </div>

            {/* Printable Content */}
            <div ref={printRef} className="print-container">
              <div className="p-3 h-auto grid grid-cols-12 gap-5">
                {/* Front */}
                <div className="col-span-6 shadow-lg hover:shadow-2xl w-[60%] mx-auto border border-gray-200 rounded-xl flex flex-col gap-3">
                  {/* User Basic Info */}
                  <div className="h-[250px] w-[90%] mx-auto bg-gradient-to-r from-violet-900 to-violet-700 rounded-b-[50px] flex flex-col gap-1 py-5 px-5">
                    {/* Company Name */}
                    <div className="flex justify-center items-center">
                      <p className="text-white">Company Name</p>
                    </div>

                    {/* Image */}
                    <div className="w-[100px] h-[100px] overflow-hidden rounded-[50%] p-2 bg-white mx-auto flex items-center justify-center">
                      <div className="w-[80px] h-[80px] overflow-hidden rounded-[50%]">
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
                  <div className="flex flex-col gap-1 px-5">
                    <div className="grid grid-cols-12 gap-5">
                      <div className="col-span-4 text-left ps-5">
                        <p className="text-xs font-bold">Emp Code</p>
                      </div>
                      <div className="col-span-1">:</div>
                      <div className="col-span-7">
                        <p className="text-xs">{data?.emp_id || "N/A"}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-12 gap-5">
                      <div className="col-span-4 text-left ps-5">
                        <p className="text-xs font-bold">D.O.B</p>
                      </div>
                      <div className="col-span-1">:</div>
                      <div className="col-span-7">
                        <p className="text-xs">
                          {data?.dob?.replaceAll("-", "/") || "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-12 gap-5">
                      <div className="col-span-4 text-left ps-5">
                        <p className="text-xs font-bold">Blood Gp.</p>
                      </div>
                      <div className="col-span-1">:</div>
                      <div className="col-span-7">
                        <p className="text-xs">{data?.blood_group || "N/A"}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-12 gap-5">
                      <div className="col-span-4 text-left ps-5">
                        <p className="text-xs font-bold">Mobile No.</p>
                      </div>
                      <div className="col-span-1">:</div>
                      <div className="col-span-7">
                        <p className="text-xs">{data?.contact_no || "N/A"}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-12 gap-5">
                      <div className="col-span-4 text-left ps-5">
                        <p className="text-xs font-bold">Email</p>
                      </div>
                      <div className="col-span-1">:</div>
                      <div className="col-span-7">
                        <p className="text-xs">{data?.email || "N/A"}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-12 gap-5">
                      <div className="col-span-4 text-left ps-5">
                        <p className="text-xs font-bold">Address</p>
                      </div>
                      <div className="col-span-1">:</div>
                      <div className="col-span-7">
                        <p className="text-xs">{data?.address || "N/A"}</p>
                      </div>
                    </div>
                  </div>

                  {/* OR/Bar Code */}

                  {/* Border Bottom */}
                  <div className="w-full h-[20px] mt-auto bg-rose-300 rounded-b-xl"></div>
                </div>

                {/* Back */}
                <div className="col-span-6 shadow-lg hover:shadow-2xl w-[60%] mx-auto border border-gray-200 rounded-xl flex flex-col gap-3">
                  {/* Points */}
                  <div className="px-5 py-5">
                    <ol className="flex flex-col gap-1">
                      <li className="text-xs">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.
                      </li>
                      <li className="text-xs">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.
                      </li>
                      <li className="text-xs">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.
                      </li>
                    </ol>
                  </div>

                  {/* User Profile Information */}
                  <div className="flex flex-col justify-center gap-2 px-5">
                    <div className="grid grid-cols-12 gap-5 w-[80%] mx-auto">
                      <div className="col-span-5 ps-5 text-left">
                        <p className="text-xs font-bold">Join Date</p>
                      </div>
                      <div className="col-span-1">:</div>
                      <div className="col-span-6">
                        <p className="text-xs">
                          {data?.join_date?.replaceAll("-", "/") || "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-12 gap-5 w-[80%] mx-auto">
                      <div className="col-span-5 text-left ps-5">
                        <p className="text-xs font-bold">Expire Date</p>
                      </div>
                      <div className="col-span-1">:</div>
                      <div className="col-span-6">
                        <p className="text-xs">
                          {data?.dob?.replaceAll("-", "/") || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* OR Code & Office Address Section */}
                  <div className="bg-gradient-to-r from-violet-900 to-violet-700 relative mt-5 flex flex-col justify-end py-2">
                    {/* OR Code */}
                    <div className="mx-auto w-[100px] h-[100px] border border-[5px] border-gray-200 translate-y-[-20%] flex justify-center items-center">
                      <QRCode value={employeeData} size={80} />
                    </div>

                    {/* Office Address */}
                    <div className="">
                      <div>
                        <h2 className="text-center text-white">
                          Office Address
                        </h2>
                      </div>
                      <div>
                        <p className="text-xs text-white text-center">
                          G-02, Rama Mandi, Talwara, Punjab
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* HR Signature */}
                  <div className="text-center flex flex-col justify-center items-center">
                    <div className="w-[100px] h-[80px] object-contain overflow-hidden border-b border-b-[2px] border-b-black">
                      <img src="/Images/dummy_sig.jpg" alt="hr-signature" />
                    </div>
                    <p>HR Signature</p>
                  </div>

                  {/* Border Bottom */}
                  <div className="w-full h-[20px] mt-auto bg-rose-300 rounded-b-xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
