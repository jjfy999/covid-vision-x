import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContexr"; // Assuming AuthContext

const RoleRoute = ({ requiredRole }) => {
  const { user } = useAuth();

  if (!user || (user && !requiredRole.includes(user.role))) {
    // Redirect if not logged in or role doesn't match
    return <Navigate to="/loginpage" replace />;
  }

  return <Outlet />;
};

export default RoleRoute;