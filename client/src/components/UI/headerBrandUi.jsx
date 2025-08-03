import { Link } from "react-router-dom";

export const HeaderBrand = () => {
  return (
    <>
      {/* Logo Container */}
      <div className="basis-[16rem] flex-shrink-0 border-e-gray-200 px-2 py-2 sticky top-0">
        <Link
          to="/procurement/dashboard"
          className="flex flex-col items-center"
        >
          <p className="text-3xl font-bold text-white">ERP</p>
          <span className="text-[10px] text-white">
            Enterprise Resource Planning
          </span>
        </Link>
      </div>
    </>
  );
};
