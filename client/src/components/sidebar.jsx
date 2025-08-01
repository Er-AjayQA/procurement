import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowDropright, IoMdArrowDropdown } from "react-icons/io";
import { useEffect, useState } from "react";
import { setActiveModule, setActiveSubmodule } from "../ReduxToolkit/authSlice";

export const SidebarMenu = () => {
  const { assignedModules, activeModule, activeSubmodule } = useSelector(
    (state) => state.auth
  );
  const [openMenuId, setOpenMenuId] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle Menu Click
  const handleMenuClick = (module, firstSubmodule) => {
    setOpenMenuId((prev) => (prev === module.id ? null : module.id));
    dispatch(setActiveModule({ activeModule: module.name }));

    if (firstSubmodule) {
      dispatch(setActiveSubmodule({ activeSubmodule: firstSubmodule.name }));
    } else {
      dispatch(setActiveSubmodule({ activeSubmodule: null }));
    }
  };

  // Handle Submenu Click
  const handleSubmenuClick = (moduleName, subModuleName) => {
    dispatch(setActiveModule({ activeModule: moduleName }));
    dispatch(setActiveSubmodule({ activeSubmodule: subModuleName }));
  };

  useEffect(() => {
    if (activeSubmodule) {
      const parentModule = assignedModules.find((module) =>
        module.submodules?.some((sub) => sub.name === activeSubmodule)
      );
      if (parentModule) {
        setOpenMenuId(parentModule.id);
      }
    }
  }, [activeSubmodule, assignedModules]);

  return (
    <>
      <div className=" py-5">
        <ul className="flex flex-col gap-3">
          <li>
            <Link
              to={`/procurement/dashboard`}
              className={`flex justify-between items-center !text-[.8rem] px-2 py-1 text-sm border-s border-s-[2px] hover:border-s-gray-400 hover:text-gray-500 ${
                activeModule === "Dashboard"
                  ? "border-s-gray-500 text-gray-500"
                  : "border-s-transparent"
              }`}
              onClick={() => {
                dispatch(setActiveModule({ activeModule: "Dashboard" }));
                dispatch(
                  setActiveSubmodule({
                    activeSubmodule: null,
                  })
                );
                setOpenMenuId(null);
              }}
            >
              Dashboard
            </Link>
          </li>
          {assignedModules.map((module) => {
            const firstSubmodule =
              module.submodules && module.submodules.length > 0
                ? module.submodules[0]
                : "#";

            return (
              <li key={module.id}>
                <Link
                  to={`/procurement/${module.endpoint}/${firstSubmodule.endpoint}`}
                  className={`flex justify-between items-center !text-[.8rem] px-2 py-1 text-sm border-s border-s-[2px] hover:border-s-gray-400 hover:text-gray-500 ${
                    activeModule === module.name
                      ? "border-s-gray-500 text-gray-500"
                      : "border-s-transparent"
                  }`}
                  onClick={() => handleMenuClick(module, firstSubmodule)}
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
                            className={`block px-2 py-2 text-[.7rem] translate-x-0 transition-all duration-[.2s] hover:translate-x-1 hover:text-gray-400 rounded-md ${
                              activeSubmodule === submodule.name &&
                              "text-gray-400 translate-x-1"
                            }`}
                            onClick={() =>
                              handleSubmenuClick(module.name, submodule.name)
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
