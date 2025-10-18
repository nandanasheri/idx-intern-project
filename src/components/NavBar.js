import React from "react";
import {Link} from "react-router-dom";
import "./NavBar.css";

function NavBar()
{
    return(
        <nav className="navbar">
            <h2 classname="logo">IDX Exchange</h2>
            <u1 className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/">Listings</Link></li>
                <li><a href='#'>Contact</a></li>
            </u1>
        </nav>
    );
}

export default NavBar;