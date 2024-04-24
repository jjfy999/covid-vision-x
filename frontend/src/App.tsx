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
import Profile from './pages/Profile';
import LoginPage from "./pages/LoginPage";
import EditProfile from "./pages/EditProfile";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Home />} />
      <Route path="/report" element={<Report />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/loginpage" element={<LoginPage />} />
      <Route path="/editProfile" element={<EditProfile />} />
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
