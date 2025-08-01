import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IoMdArrowDropright, IoMdArrowDropdown } from "react-icons/io";
import { useState } from "react";
import { setActiveModule, setActiveSubmodule } from "../ReduxToolkit/authSlice";

export const SidebarMenu = () => {
  const { assignedModules } = useSelector((state) => state.auth);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [openSubMenuId, setOpenSubMenuId] = useState(null);
  const dispatch = useDispatch();

  // Handle Menu Click
  const handleMenuClick = (moduleId, menuName) => {
    setOpenMenuId((prev) => {
      if (prev === moduleId) {
        return null;
      } else {
        return moduleId;
      }
    });
    localStorage.setItem("activeModule", JSON.stringify(menuName));
    dispatch(setActiveModule({ activeModule: menuName }));
  };

  // Handle Submenu Click
  const handleSubmenuClick = (submoduleId, menuName) => {
    setOpenSubMenuId(submoduleId);
    localStorage.setItem("activeSubmodule", JSON.stringify(menuName));
    dispatch(setActiveSubmodule({ activeSubmodule: menuName }));
  };

  return (
    <>
      <div className=" py-5">
        <ul className="flex flex-col gap-3">
          <li>
            <Link
              to={`/procurement/dashboard`}
              className={`flex justify-between items-center  px-2 py-1 text-sm border-s border-s-[2px] border-s-transparent hover:border-s-gray-400 hover:text-gray-500 ${
                openSubMenuId === 0 && "border-s-gray-500 text-gray-500"
              }`}
              onClick={() => {
                handleMenuClick(0, "Dashboard"), handleSubmenuClick(0, "");
              }}
            >
              Dashboard
            </Link>
          </li>
          {assignedModules.map((module) => {
            return (
              <li key={module.id}>
                <Link
                  className={`flex justify-between items-center  px-2 py-1 text-sm border-s border-s-[2px] border-s-transparent hover:border-s-gray-400 hover:text-gray-500 ${
                    openMenuId === module.id &&
                    "border-s-gray-500 text-gray-500"
                  }`}
                  onClick={() => handleMenuClick(module.id, module.name)}
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
                            to={`/procurement/${module.endpoint}/${submodule.endpoint}`}
                            className={`block px-2 py-2 text-sm transition-all duration-[.2s] hover:translate-x-1 hover:text-gray-400 rounded-md ${
                              openSubMenuId === submodule.id &&
                              "text-gray-400 translate-x-1"
                            }`}
                            onClick={() =>
                              handleSubmenuClick(submodule.id, submodule.name)
                            }
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
