import { useSelector } from "react-redux";

export const EmployeeDetailPage = () => {
  const { userDetails } = useSelector((state) => state.auth);
  return (
    <>
      <div className="flex flex-col">
        <div className="flex gap-3 items-center py-2 border-b border-b-gray-200">
          <div className="flex justify-between w-[5rem] h-[5rem] rounded-[50%] overflow-hidden">
            <img
              src={`${
                userDetails.userImage !== null
                  ? userDetails.userImage
                  : "/Images/dummy_userProfile.png"
              }`}
              alt="user-profile-image"
              className=""
            />
          </div>
          <div>
            <p className="font-bold">{userDetails.userName}</p>
            <p className="text-[.6rem]">{userDetails.emp_code}</p>
          </div>
        </div>
      </div>
    </>
  );
};
