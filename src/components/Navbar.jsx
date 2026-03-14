import React from "react";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      
      <Link className="navbar-brand text-warning fw-bold" href="/">
        MasterChef Recipes
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">

          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>

          <li className="nav-item">
           <Link className="nav-link" to="/recipes">Recipes</Link>
          </li>

          <li className="nav-item">
           <Link className="nav-link" to="/add-recipe">Add Recipe</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/register">Registe</Link>
          </li>

        </ul>
      </div>
    </nav>
  );
}

export default Navbar;