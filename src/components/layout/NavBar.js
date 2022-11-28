import React from "react";
import "./NavBar.style.css";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="nav">
      <Link to="/">Dashboard</Link>
      <Link to="/move">Move</Link>
      <Link to="/admin">Admin</Link>
      <div>About</div>
    </nav>
  );
}
