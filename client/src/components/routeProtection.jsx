import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export const ProtectedRoute = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location.pathname.split("/"));

  useEffect(() => {
    if (!token && location.pathname.split("/").includes("home")) {
      return navigate("/procurement/sign-in");
    }

    if (token && location.pathname.split("/").includes("sign-in")) {
      return navigate("/procurement/home");
    }
  }, [location]);

  return (
    <>
      <Outlet />
    </>
  );
};
