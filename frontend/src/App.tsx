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
import RoleRoute from "./pages/templates/RoleRoute";
import DoctorProfile from "./pages/DoctorProfile"; // Import the DoctorProfile component
import RsProfile from "./pages/RsProfile"; // Import the RsProfile component
import ErrorPage from "./pages/ErrorPage"; // Catch all for any invalid urls
import CreateUser from "./pages/CreateUser";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/loginpage" element={<LoginPage />} />
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/doctorprofile" element={<DoctorProfile />} />
        <Route path="/Rsprofile" element={<RsProfile />} />
        <Route element={<RoleRoute requiredRole={"patient"} />}>
          <Route path="/report" element={<Report />} />
          <Route path="/PatientProfile" element={<PatientProfile />} />
          <Route path="/patientEditProfile" element={<PatientEditProfile />} />
        </Route>
        <Route element={<RoleRoute requiredRole={"system_admin"} />}>
          <Route path="/UserAcc" element={<UserAccount />} />
          <Route path="/AccDetail/:userId" element={<AccountDetails />} />
          <Route path="/EditAcc/:userId" element={<EditAccountDetails />} />
          <Route path="/SysAdProfile" element={<SysadProfile />} />
          <Route path="/SysAdEditProfile" element={<SysadEditProfile />} />
          <Route path="/CreateUser" element={<CreateUser />} />
        </Route>
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

/*
const App: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        {/** Public Routes *
        <Route path="/loginpage" element={<LoginPage />} />
        {/** Private Routes *
        <Route element={<PrivateRoute />}>
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
*/
export default App;
