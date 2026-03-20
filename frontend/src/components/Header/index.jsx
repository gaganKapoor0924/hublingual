import React from "react";
import logo from "../../assets/hublingual-logo.jpeg";
import "./style.css";

const Header = () => {
  return (
    <div className="header_container">
      <div className="main_header">
        <div className="logo">
          <img src={logo} alt="hublingual" />
        </div>
        <nav className="navigation">
          <ul>
            <li>Home</li>
            <li>Courses</li>
            <li>Gallery</li>
            <li>Blogs</li>
            <li>Kids Section</li>
            <li>Online Class</li>
            <li>Contact</li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
