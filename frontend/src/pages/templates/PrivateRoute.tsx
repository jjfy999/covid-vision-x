import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContexr";

const PrivateRoute = () => {
  const { authTokens } = useAuth();
  return authTokens ? <Outlet /> : <Navigate to="/loginpage" replace />;
};

export default PrivateRoute;
