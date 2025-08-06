import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export const ProtectedRoute = () => {
  const { token, assignedModules, activeModule, activeSubmodule } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!token && !location.pathname.split("/").includes("sign-in")) {
      return navigate("/procurement/sign-in");
    }

    if (token && location.pathname.split("/").includes("sign-in")) {
      if (activeModule && activeSubmodule) {
        const moduleDetails = assignedModules?.find(
          (module) => activeModule == module.name
        );

        if (moduleDetails) {
          const subModuleDetails = moduleDetails.submodules.find(
            (submodule) => activeSubmodule === submodule.name
          );

          if (subModuleDetails) {
            navigate(
              `/procurement/${moduleDetails.endpoint}/${subModuleDetails.endpoint}`
            );
            return;
          }
        }
      }
      navigate("/procurement/dashboard");
    }
  }, [
    location,
    token,
    activeModule,
    activeSubmodule,
    assignedModules,
    navigate,
  ]);

  return (
    <>
      <Outlet />
    </>
  );
};
