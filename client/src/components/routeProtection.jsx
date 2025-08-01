import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { setActiveModule } from "../ReduxToolkit/authSlice";

export const ProtectedRoute = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token && !location.pathname.split("/").includes("sign-in")) {
      return navigate("/procurement/sign-in");
    }

    if (token && location.pathname.split("/").includes("sign-in")) {
      return navigate("/procurement/dashboard");
    }

    if (location.pathname.split("/").includes("dashboard")) {
      dispatch(setActiveModule({ activeModule: "Dashboard" }));
    }
  }, [location, token]);

  return (
    <>
      <Outlet />
    </>
  );
};
