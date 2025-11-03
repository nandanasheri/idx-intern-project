import React from "react";
import { Link } from "react-router-dom";

const NavBar: React.FC = () => {
  return (
    <nav className="flex justify-between items-center px-12 py-4 bg-gradient-to-r from-primary to-primary-light shadow-lg sticky top-0 z-50">
      <h2 className="text-white text-3xl font-bold drop-shadow-md">IDX Exchange</h2>
      <ul className="flex list-none gap-8">
        <li>
          <Link 
            to="/" 
            className="text-white no-underline font-medium text-lg transition-all duration-300 px-4 py-2 rounded hover:bg-white/20 hover:-translate-y-0.5"
          >
            Home
          </Link>
        </li>
        <li>
          <a 
            href='#contact' 
            className="text-white no-underline font-medium text-lg transition-all duration-300 px-4 py-2 rounded hover:bg-white/20 hover:-translate-y-0.5"
          >
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
