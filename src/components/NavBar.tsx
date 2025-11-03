import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar: React.FC = () => {
  return (
    <nav className="navbar">
      <h2 className="logo">IDX Exchange</h2>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><a href='#contact'>Contact</a></li>
      </ul>
    </nav>
  );
};

export default NavBar;
