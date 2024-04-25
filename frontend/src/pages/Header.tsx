import { AppBar, Toolbar, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from 'react';
import logo_tran from '../../../static/images/logo_transparent.png';
import { Link, useLocation } from 'react-router-dom';
import '../theme/header.css';

type UserRole = 'patient' | 'sysad';

interface HeaderProps {
  userRole: UserRole; // Define the type of the userRole prop
}

const Header: React.FC<HeaderProps> = ({ userRole }) => {
  const location = useLocation();

  return (
    <header>
      <div id="logoImgBox">
        <img src={logo_tran} id="logoImg" alt="Logo" />
      </div>

      <nav className="navbar">
        {userRole === 'patient' && (
          <>
            <Link to="/Report" className={location.pathname === '/Report' ? 'active' : 'report'}>Report</Link>
            <Link to="/PatientProfile" className={location.pathname === '/PatientProfile' || location.pathname === '/PatientEditProfile' ? 'active' : 'profile'}>Profile</Link>
          </>
        )}
        {userRole === 'sysad' && (
          <>
            <Link to="/UserAcc" className={location.pathname === '/UserAcc' || location.pathname === '/AccDetail' || location.pathname === '/EditAcc' ? 'active' : 'useracc'}>User Accounts</Link>
            <Link to="/SysAdProfile" className={location.pathname === '/SysAdProfile' || location.pathname === '/SysAdEditProfile' ? 'active' : 'profile'}>Profile</Link>
          </>
        )}
      </nav>

      <div className="icons">
        <i className="fas fa-bars" id="menu-bars"></i>
        <Link to="/LoginPage" className="bx bx-lock-open"></Link>
      </div>
    </header>
  );
};

export default Header;

