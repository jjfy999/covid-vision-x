import React from "react";
import logo_tran from "../../images/logo_transparent.png";
import { Link, useLocation } from "react-router-dom";
import "../../css/header.css";
import { useAuth } from "./AuthContexr";

type UserRole = "patient" | "system_admin" | "doctor" | "researcher";

interface HeaderProps {
    userRole: UserRole; // Define the type of the userRole prop
}

const Header: React.FC<HeaderProps> = ({ userRole }) => {
    const location = useLocation();
    const { logoutUser } = useAuth();
    const isAccDetailPage = location.pathname.includes("/AccDetail/");

    const [patientMenuOpen, setPatientMenuOpen] = React.useState(false);
    const [activeLink, setActiveLink] = React.useState(() => {
        if (
            location.pathname.includes("/DoctorReport/") ||
            location.pathname.includes("/DoctorUploadImage/") ||
            location.pathname.includes("/DoctorNonUpdatedReport/")
        ) {
            return "Patient";
        } else if (location.pathname.includes("/HomePage/")) {
            return "Home";
        } else {
            return "Profile";
        }
    });

    const handlePatientMenuClick = () => {
        // setPatientMenuOpen(!patientMenuOpen);
        // console.log(patientMenuOpen);
        // if (patientMenuOpen == true) {
        //     setActiveLink("Profile");
        //     console.log("after close: ", patientMenuOpen);
        // }

        // if (!patientMenuOpen) {
        //     // Open patient menu and change location to "/DoctorReport"
        //     setPatientMenuOpen(true);
        //     setActiveLink("Patient");
        //     navigate("/DoctorReport");
        // } else {
        //     // Close patient menu and reset active link to "Profile"
        //     setPatientMenuOpen(false);
        //     setActiveLink("Profile");
        // }
        setPatientMenuOpen(!patientMenuOpen);
    };

    React.useEffect(() => {
        // Update activeLink when the pathname changes
        if (
            location.pathname.includes("/DoctorReport/") ||
            location.pathname.includes("/DoctorUploadImage/") ||
            location.pathname.includes("/DoctorNonUpdatedReport/")
        ) {
            setActiveLink("Patient");
        } else if (location.pathname.includes("/HomePage/")) {
            setActiveLink("Home");
        } else {
            setActiveLink("Profile");
        }
    }, [location.pathname]);

    return (
        <header>
            <div id="logoImgBox">
                <img src={logo_tran} id="logoImg" alt="Logo" />
            </div>

            <nav className="navbar">
                {userRole === "patient" && (
                    <>
                        <Link
                            to="/HomePage/"
                            className={
                                location.pathname === "/HomePage/"
                                    ? "active"
                                    : "home"
                            }
                            state={{ userRole: userRole }}
                        >
                            Home
                        </Link>
                        <Link
                            to="/PatientReports/"
                            className={
                                location.pathname === "/PatientReports/"||
                                location.pathname === "/Report/"
                                    ? "active"
                                    : "report"
                            }
                        >
                            Report
                        </Link>
                        <Link
                            to="/PatientProfile/"
                            className={
                                location.pathname === "/PatientProfile/" ||
                                location.pathname === "/PatientEditProfile/"
                                    ? "active"
                                    : "profile"
                            }
                        >
                            Profile
                        </Link>
                    </>
                )}
                {userRole === "system_admin" && (
                    <>
                        <Link
                            to="/HomePage/"
                            className={
                                location.pathname === "/HomePage/"
                                    ? "active"
                                    : "home"
                            }
                            state={{ userRole: userRole }}
                        >
                            Home
                        </Link>
                        <Link
                            to="/UserAcc/"
                            className={
                                location.pathname === "/UserAcc/" ||
                                isAccDetailPage ||
                                location.pathname === "/EditAcc/" ||
                                location.pathname === "/CreateUser/"
                                    ? "active"
                                    : "useracc"
                            }
                        >
                            User Accounts
                        </Link>
                        <Link
                            to="/SysAdProfile/"
                            className={
                                location.pathname === "/SysAdProfile/" ||
                                location.pathname === "/SysAdEditProfile/"
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
                        <Link
                            to="/HomePage/"
                            className={
                                location.pathname === "/HomePage/"
                                    ? "active"
                                    : "home"
                            }
                            state={{ userRole: userRole }}
                        >
                            Home
                        </Link>
                        {/* <div onClick={handlePatientMenuClick}> */}
                        <div className="patient-tab">
                            <button
                                className={
                                    activeLink === "Patient" ? "active" : ""
                                }
                                onClick={handlePatientMenuClick}
                            >
                                Patient
                            </button>
                            {/* Render dropdown menu if the patientMenuOpen state is true */}
                            {patientMenuOpen && (
                                <div className="dropdown-menu">
                                    <Link to="/patientList/">
                                        View Patients
                                    </Link>
                                    <Link to="/DoctorReport/">
                                        Patient Report
                                    </Link>
                                    <Link to="/DoctorUploadImage/">
                                        Upload X-ray Image
                                    </Link>
                                    <Link to="/DoctorNonUpdatedReport/">
                                        Non-Uploaded Report
                                    </Link>
                                </div>
                            )}
                        </div>
                        {/* <Link
                            to="#"
                            className={
                                activeLink === "Patient" ? "active" : " "
                            }
                            onClick={() => {
                                setActiveLink("Patient");
                                handlePatientMenuClick();
                            }}
                        >
                            Patient
                        </Link>
                        {/* </div> */}
                        {/* {patientMenuOpen && (
                            <div
                                className="dropdown-menu"
                                onClick={(event) => event.stopPropagation()}
                            >
                                <Link to="/DoctorReport">Patient Report</Link>
                                <Link to="/DoctorUploadImage">
                                    Upload X-ray Image
                                </Link>
                                <Link to="/DoctorNonUpdatedReport">
                                    Non-Uploaded Report
                                </Link>
                            </div>
                        )} */}
                        <Link
                            to="/doctorprofile/"
                            className={
                                activeLink === "Profile" ? "active" : " "
                            }
                        >
                            Profile
                        </Link>
                    </>
                )}
                {userRole === "researcher" && (
                    <>
                        <Link
                            to="/HomePage/"
                            className={
                                location.pathname === "/HomePage/"
                                    ? "active"
                                    : "home"
                            }
                            state={{ userRole: userRole }}
                        >
                            Home
                        </Link>
                        <Link
                            to="/Model/"
                            className={
                                location.pathname === "/model/"
                                    ? "active"
                                    : "model"
                            }
                        >
                            Model
                        </Link>
                        <Link
                            to="/RsProfile/"
                            className={
                                location.pathname === "/RsProfile/" ||
                                location.pathname === "/RsEditProfile/"
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
