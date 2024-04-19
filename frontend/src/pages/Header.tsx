import { AppBar, Link, Toolbar, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from 'react';
import '../css/Report.css';

const Header = () => {
  return (
    <header>
      <div id="logoImgBox">
        <img src="../images/logo_transparent.png" id="logoImg" alt="Logo" />
      </div>

      <nav className="navbar">
        <a className="active" href="Report.html">Report</a>
        <a className="profile" href="Profile.html">Profile</a>
      </nav>

      <div className="icons">
        <i className="fas fa-bars" id="menu-bars"></i>
        <a href="/LoginPageUI/login.html" className="bx bx-lock-open"></a>
      </div>
    </header>
  );
};

export default Header;
