import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { useAuth } from "./AuthContexr";
import { useNavigate } from "react-router-dom";

interface DrawerAppBarProps {
  firstText: string;
  userRole: "doctor" | "patient" | "system_admin" | "researcher";
}

export default function DrawerAppBar({
  firstText,
  userRole,
}: DrawerAppBarProps) {
  const [patientMenuAnchorEl, setPatientMenuAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const openPatient = Boolean(patientMenuAnchorEl);
  const handlePatientClick = (event: React.MouseEvent<HTMLElement>) => {
    setPatientMenuAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setPatientMenuAnchorEl(null);
    setProfileMenuAnchorEl(null);
  };

  const [profileMenuAnchorEl, setProfileMenuAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const openProfile = Boolean(profileMenuAnchorEl);
  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setProfileMenuAnchorEl(event.currentTarget);
  };
  const { logoutUser } = useAuth();
  const navigate = useNavigate();
  const getMenuItems = (
    userRole: "doctor" | "patient" | "system_admin" | "researcher"
  ) => {
    switch (userRole) {
      case "doctor":
        return [
          {
            name: "Upload X-Ray Image",
            onClick: () => navigate("/upload-xray"), // navigate to be updated
          },
          { name: "Report", onClick: () => navigate("/doctor-report") }, // navigate to be updated
          {
            name: "Non-Uploaded Report",
            onClick: () => navigate("/non-uploaded-report"), // navigate to be updated
          },
        ];
      case "patient":
        return [{ name: "Report", onClick: () => navigate("/report") }];

      case "system_admin":
        return [
          { name: "User Accounts", onClick: () => navigate("/UserAcc") },
          { name: "Create User", onClick: () => navigate("/createUser") }, // navigate to be updated
        ];
      case "researcher":
        return [
          { name: "Upload Model", onClick: () => navigate("/uploadModel") }, // navigate to be updated
        ];
    }
  };
  const menuItems = getMenuItems(userRole);
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ bgcolor: "#267b83", padding: "8px 0" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            COVID VISION X
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button
              sx={{
                color: "#fff",
                backgroundColor: "#ecbb50d7",
                fontSize: "1rem",
                padding: "6px 12px",
                "&:hover": { backgroundColor: "#b2a434" },
              }}
              id="patient-button"
              aria-controls={openPatient ? "fade-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openPatient ? "true" : undefined}
              onClick={handlePatientClick}
            >
              {firstText}
            </Button>
            <Menu
              id="patient-menu"
              MenuListProps={{
                "aria-labelledby": "fade-button",
              }}
              anchorEl={patientMenuAnchorEl}
              open={Boolean(patientMenuAnchorEl)}
              onClose={handleClose}
              TransitionComponent={Fade}
              sx={{ mt: "45px" }}
            >
              {menuItems.map((item, index) => (
                <MenuItem key={index} onClick={item.onClick}>
                  {item.name}
                </MenuItem>
              ))}
            </Menu>

            <div style={{ width: "100px" }}></div>

            <Button
              sx={{
                color: "#fff",
                backgroundColor: "#ecbb50d7",
                fontSize: "1rem",
                padding: "6px 12px",
                "&:hover": { backgroundColor: "#b2a434" },
              }}
              id="profile-button"
              aria-controls={openProfile ? "fade-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openProfile ? "true" : undefined}
              onClick={handleProfileClick}
            >
              Profile
            </Button>
            <Menu
              id="profile-menu"
              MenuListProps={{
                "aria-labelledby": "fade-button",
              }}
              anchorEl={profileMenuAnchorEl}
              open={Boolean(profileMenuAnchorEl)}
              onClose={handleClose}
              TransitionComponent={Fade}
              sx={{ mt: "45px" }}
            >
              <MenuItem onClick={() => navigate("/doctorprofile")}>
                View Profile
              </MenuItem>
              <MenuItem onClick={logoutUser}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
