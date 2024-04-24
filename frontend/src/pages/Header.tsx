import { AppBar, Toolbar, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from 'react';
import '../css/Report.css';
import logo_tran from '../../../static/images/logo_transparent.png';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <div id="logoImgBox">
        <img src={logo_tran} id="logoImg" alt="Logo" />
      </div>

      <nav className="navbar">
        <Link to="/Report" className="active">Report</Link>
        <Link to="/Profile" className="profile">Profile</Link>
      </nav>

      <div className="icons">
        <i className="fas fa-bars" id="menu-bars"></i>
        <Link to="/LoginPage" className="bx bx-lock-open"></Link>
      </div>
    </header>
  );
};

export default Header;
