import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IoMdArrowDropright, IoMdArrowDropdown } from "react-icons/io";
import { useState } from "react";

export const SidebarMenu = () => {
  const { assignedModules } = useSelector((state) => state.auth);
  const [openMenuId, setOpenMenuId] = useState(null);

  // Handle Menu Click
  const handleMenuClick = (moduleId) => {
    setOpenMenuId((prev) => {
      if (prev === moduleId) {
        return null;
      } else {
        return moduleId;
      }
    });
  };

  return (
    <>
      <div className=" py-5 px-2">
        <ul className="flex flex-col gap-3">
          {assignedModules.map((module) => {
            return (
              <li key={module.id}>
                <Link
                  className={`flex justify-between items-center px-2 py-1 text-sm border-s border-s-[2px] border-s-transparent hover:border-s-[#400f5c] ${
                    openMenuId === module.id && "border-s-[#400f5c]"
                  }`}
                  onClick={() => handleMenuClick(module.id)}
                >
                  {module.name}
                  {module.submodules && openMenuId === module.id ? (
                    <IoMdArrowDropdown />
                  ) : (
                    <IoMdArrowDropright />
                  )}
                </Link>

                {module.submodules && (
                  <ul
                    className={`p-3 transition-all duration-[.8s] ease-in-out ${
                      openMenuId === module.id ? "block" : "hidden"
                    }`}
                  >
                    {module.submodules.map((submodule) => {
                      return (
                        <li key={submodule.id}>
                          <Link className="block px-2 py-2 text-sm hover:bg-[#F5E9FB] rounded-md">
                            {submodule.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
