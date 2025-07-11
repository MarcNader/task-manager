import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { MainState } from "../../store/Store";

const PrivateRoute = () => {
  const location = useLocation(); // Get current location
  const userID = useSelector((state: MainState) => state.authentication.userId);

  if (!userID) {
    return <Navigate to="/SignIn" />;
  }

  // If the user is logged in and on "/", redirect to "/Tasks"
  return location.pathname === "/" ? (
    <Navigate to="/Tasks" replace />
  ) : (
    <Outlet />
  );
};

export default PrivateRoute;
