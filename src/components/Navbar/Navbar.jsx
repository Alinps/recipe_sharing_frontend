import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);
  // const user = JSON.parse(localStorage.getItem("user"));
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (

    <header className={styles.navbarWrapper}>

      <div className={`container ${styles.navbar}`}>

        <Link to="/" className={styles.logo}>
          MasterChef
        </Link>

        <nav className={`${styles.navLinks} ${menuOpen ? styles.active : ""}`}>

          <Link to="/">Home</Link>
          <Link to="/recipes">Recipes</Link>
          <Link to="/add-recipe">Add Recipe</Link>
          {/* <Link to={`/profile/${user.id}`}>Profile</Link> */}
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>

        </nav>

        <div className={styles.menuToggle} onClick={toggleMenu}>
          ☰
        </div>

      </div>

    </header>

  );
}

export default Navbar;