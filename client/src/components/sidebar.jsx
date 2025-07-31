import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowDropright, IoMdArrowDropdown } from "react-icons/io";
import { useState } from "react";

export const SidebarMenu = () => {
  const { assignedModules } = useSelector((state) => state.auth);
  const [openMenuId, setOpenMenuId] = useState(null);
  const navigate = useNavigate();

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

  // Handle SubmenuClick
  const handleSubmenuClick = (module, submodule) => {
    navigate(`/procurement/${module}/${submodule}`);
  };

  return (
    <>
      <div className=" py-5">
        <ul className="flex flex-col gap-3">
          {assignedModules.map((module) => {
            return (
              <li key={module.id}>
                <Link
                  className={`flex justify-between items-center  px-2 py-1 text-sm border-s border-s-[2px] border-s-transparent hover:border-s-gray-400 hover:text-gray-500 ${
                    openMenuId === module.id &&
                    "border-s-gray-500 text-gray-500"
                  }`}
                  onClick={() => handleMenuClick(module.id)}
                >
                  {module.name}
                  {module.submodules && openMenuId === module.id ? (
                    <IoMdArrowDropdown className="text-[1.2rem]" />
                  ) : (
                    <IoMdArrowDropright className="text-[1.2rem]" />
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
                          <Link
                            className="block px-2 py-2 text-sm transition-all duration-[.2s] hover:translate-x-1 hover:text-gray-400 rounded-md"
                            onClick={() => {
                              handleSubmenuClick(
                                module.endpoint,
                                submodule.endpoint
                              );
                            }}
                          >
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
