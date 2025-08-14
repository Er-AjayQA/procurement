import { MdEdit } from "react-icons/md";

export const EditIcon = ({ onClick }) => {
  return (
    <div
      className="p-1 hover:bg-blue-600 rounded-lg cursor-pointer"
      onClick={() => onClick()}
    >
      <MdEdit className="hover:fill-white" />
    </div>
  );
};
