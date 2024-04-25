import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { createMuiTheme } from "./theme/theme";
import { ThemeProvider } from "@emotion/react";
import React from 'react';
import Report from './pages/Report';
import PatientProfile from './pages/PatientProfile'; 
import LoginPage from "./pages/LoginPage";
import PatientEditProfile from "./pages/PatientEditProfile";
import UserAccount from "./pages/UserAcc";
import AccountDetails from "./pages/AccDetail";
import EditAccountDetails from "./pages/EditAcc";
import SysadProfile from "./pages/SysAdProfile";
import SysadEditProfile from "./pages/SysAdEditProfile";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/report" element={<Report />} />
      <Route path="/PatientProfile" element={<PatientProfile />} />
      <Route path="/loginpage" element={<LoginPage />} />
      <Route path="/patientEditProfile" element={<PatientEditProfile />} />
      <Route path="/" element={<UserAccount />} />
      <Route path="/accDetail" element={<AccountDetails />} />
      <Route path="/editAcc" element={<EditAccountDetails />} />
      <Route path="/sysAdProfile" element={<SysadProfile />} />
      <Route path="/sysAdEditProfile" element={<SysadEditProfile />} />
    </Route>
  )
);

const App: React.FC = () => {
  const theme = createMuiTheme();
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
