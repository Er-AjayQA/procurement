import { FaEye } from "react-icons/fa";

export const ViewIcon = ({ onClick }) => {
  return (
    <div
      className="p-1 hover:bg-green-600 rounded-lg cursor-pointer"
      onClick={() => onClick()}
    >
      <FaEye className="hover:fill-white" />
    </div>
  );
};
