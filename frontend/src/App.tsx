import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import { createMuiTheme } from "./theme/theme";
import { ThemeProvider } from "@emotion/react";
import React from "react";
import Report from "./pages/Report";
import PatientProfile from "./pages/PatientProfile";
import LoginPage from "./pages/LoginPage";
import PatientEditProfile from "./pages/PatientEditProfile";
import UserAccount from "./pages/UserAcc";
import AccountDetails from "./pages/AccDetail";
import EditAccountDetails from "./pages/EditAcc";
import SysadProfile from "./pages/SysAdProfile";
import SysadEditProfile from "./pages/SysAdEditProfile";
import PrivateRoute from "./pages/templates/PrivateRoute";
import { AuthProvider } from "./pages/templates/AuthContexr";
/*
const router = createBrowserRouter(
  createRoutesFromElements(
    <AuthProvider>
      <Route path="/loginpage" element={<LoginPage />} />
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/report" element={<Report />} />
        <Route path="/PatientProfile" element={<PatientProfile />} />
        <Route path="/patientEditProfile" element={<PatientEditProfile />} />
        <Route path="/userAcc" element={<UserAccount />} />
        <Route path="/AccDetail/:userId" element={<AccountDetails />} />
        <Route path="/EditAcc/:userId" element={<EditAccountDetails />} />
        <Route path="/sysAdProfile" element={<SysadProfile />} />
        <Route path="/sysAdEditProfile" element={<SysadEditProfile />} />
      </Route>
    </AuthProvider>
  )
);
*/

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        {/** Public Routes */}
        <Route path="/loginpage" element={<LoginPage />} />
        {/** Private Routes */}
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/report" element={<Report />} />
          <Route path="/PatientProfile" element={<PatientProfile />} />
          <Route path="/patientEditProfile" element={<PatientEditProfile />} />
          <Route path="/userAcc" element={<UserAccount />} />
          <Route path="/AccDetail/:userId" element={<AccountDetails />} />
          <Route path="/EditAcc/:userId" element={<EditAccountDetails />} />
          <Route path="/sysAdProfile" element={<SysadProfile />} />
          <Route path="/sysAdEditProfile" element={<SysadEditProfile />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;
