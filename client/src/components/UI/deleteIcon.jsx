import { MdDelete } from "react-icons/md";

export const DeleteIcon = () => {
  return (
    <div className="p-1 hover:bg-red-600 rounded-lg cursor-pointer">
      <MdDelete className="hover:fill-white" />
    </div>
  );
};
