import { useSelector } from "react-redux";

export const Breadcrumb = () => {
  const { activeModule, activeSubmodule } = useSelector((state) => state.auth);
  return (
    <>
      <div className="flex gap-2">
        <p className="text-[.7rem]">{activeModule}</p>
        <span className="text-[.7rem]">/</span>
        <p className="text-[.7rem]">{activeSubmodule}</p>
      </div>
    </>
  );
};
