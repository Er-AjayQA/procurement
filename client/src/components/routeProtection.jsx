import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export const ProtectedRoute = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location.pathname);

  useEffect(() => {
    if (!token) {
      return navigate("/procurement/sign-in");
    }
  }, [token]);

  return (
    <>
      <Outlet />
    </>
  );
};
