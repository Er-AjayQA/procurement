import { BsSendFill } from "react-icons/bs";

export const SendLinkIcon = ({ onClick }) => {
  return (
    <div
      className="p-1 hover:bg-yellow-600 rounded-lg cursor-pointer"
      onClick={() => onClick()}
    >
      <BsSendFill className="hover:fill-white" />
    </div>
  );
};
