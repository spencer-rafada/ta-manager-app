import React from "react";
import "./NavBar.style.css";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div className="navbar-container">
      <div>Home</div>
      <div>View</div>
      <div>
        <Link style={{ textDecoration: "none" }} to="/admin">
          Admin
        </Link>
      </div>
      <div>About</div>
    </div>
  );
}
