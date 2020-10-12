import React from "react";
import logo from "./logo.svg";
import "./Header.css";

const Header = () => (
  <header className="app-header">
    <div className="app-header_logo">
      <div className="app-header_logo_mark">
        <img src={logo} alt="Big Mac World Tour"/>
      </div>
      <h4>Big Mac World Tour</h4>
    </div>
  </header>
);

export default Header;