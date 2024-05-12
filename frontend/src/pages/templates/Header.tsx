import React from "react";
import logo_tran from "../../../../static/images/logo_transparent.png";
import { Link, useLocation } from "react-router-dom";
import "../../theme/header.css";
import { useAuth } from "./AuthContexr";

type UserRole = "patient" | "sysad" | "doctor" | "researcher";

interface HeaderProps {
  userRole: UserRole; // Define the type of the userRole prop
}

const Header: React.FC<HeaderProps> = ({ userRole }) => {
  const location = useLocation();
  const { logoutUser } = useAuth();
  const isAccDetailPage = location.pathname.includes("/AccDetail");

  const [patientMenuOpen, setPatientMenuOpen] = React.useState(false);

  const handlePatientMenuClick = () => {
    setPatientMenuOpen(!patientMenuOpen);
    console.log("Patient menu clicked");
  };

  return (
    <header>
      <div id="logoImgBox">
        <img src={logo_tran} id="logoImg" alt="Logo" />
      </div>

      <nav className="navbar">
        {userRole === "patient" && (
          <>
            <Link
              to="/Report"
              className={location.pathname === "/Report" ? "active" : "report"}
            >
              Report
            </Link>
            <Link
              to="/PatientProfile"
              className={
                location.pathname === "/PatientProfile" ||
                location.pathname === "/PatientEditProfile"
                  ? "active"
                  : "profile"
              }
            >
              Profile
            </Link>
          </>
        )}
        {userRole === "sysad" && (
          <>
            <Link
              to="/UserAcc"
              className={
                location.pathname === "/UserAcc" ||
                isAccDetailPage ||
                location.pathname === "/EditAcc" ||
                location.pathname === "/CreateUser"
                  ? "active"
                  : "useracc"
              }
            >
              User Accounts
            </Link>
            <Link
              to="/SysAdProfile"
              className={
                location.pathname === "/SysAdProfile" ||
                location.pathname === "/SysAdEditProfile"
                  ? "active"
                  : "profile"
              }
            >
              Profile
            </Link>
          </>
        )}
        {userRole === "doctor" && (
          <>
            {/* <div onClick={handlePatientMenuClick}> */}
              <Link
                to="#"
                className={
                  location.pathname === "/DoctorReport"
                    ? "active"
                    : "doctor-report"
                }
                onClick={handlePatientMenuClick}
              >
                Patient
              </Link>
            {/* </div> */}
            {patientMenuOpen && (
              <div
                className="dropdown-menu"
                onClick={(event) => event.stopPropagation()}
              >
                <Link to="/DoctorReport">Patient Report</Link>
                <Link to="/upload-xray">Upload X-ray Image</Link>
                <Link to="/non-uploaded-report">Non-Uploaded Report</Link>
              </div>
            )}
            <Link
              to="/doctorprofile"
              className={
                location.pathname === "/doctorprofile" ||
                location.pathname === "/doctorEditProfile"
                  ? "active"
                  : "profile"
              }
            >
              Profile
            </Link>
          </>
        )}
        {userRole === "researcher" && (
          <>
            <Link
              to="/Model"
              className={location.pathname === "/Model" ? "active" : "model"}
            >
              Model
            </Link>
            <Link
              to="/RsProfile"
              className={
                location.pathname === "/RsProfile" ||
                location.pathname === "/RsEditProfile"
                  ? "active"
                  : "profile"
              }
            >
              Profile
            </Link>
          </>
        )}
      </nav>

      <div className="icons">
        <i className="fas fa-bars" id="menu-bars"></i>
        <Link
          to="/LoginPage"
          className="bx bx-lock-open"
          onClick={logoutUser}
        ></Link>
      </div>
    </header>
  );
};

export default Header;
