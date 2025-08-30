import { MdOutlineAssignmentInd } from "react-icons/md";

export const AssignIcon = ({ onClick }) => {
  return (
    <div
      className="p-1 hover:bg-blue-600 rounded-lg cursor-pointer"
      onClick={() => onClick()}
    >
      <MdOutlineAssignmentInd className="hover:fill-white" />
    </div>
  );
};
