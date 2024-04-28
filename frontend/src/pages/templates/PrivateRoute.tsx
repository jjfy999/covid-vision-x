{
  /*
import React from "react";
import { Route, Redirect, RouterProps } from "react-router-dom";

const isAuthenticated = true;

interface PrivateRouteProps extends RouterProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC = ({ children, ...rest }: PrivateRouteProps) => {
  return (
    <Route {...rest}>
    {isAuthenticated ? children : <Redirect to="/loginpage" replace />}
    </Route>
  );
};

export default PrivateRoute;
*/
}

import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContexr";

const PrivateRoute = () => {
  const { authTokens } = useAuth();
  return authTokens ? <Outlet /> : <Navigate to="/loginpage" />;
};

export default PrivateRoute;
