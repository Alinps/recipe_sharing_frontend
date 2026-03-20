import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useToast } from "../../context/ToastContext";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/authSlice"; 
import API from "../../services/api"

function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const handleLogout = async (e) => {
    e.preventDefault();
    try{
    const response = await API.post("logout/")
    showToast(response.data.message, "success");
    dispatch(logout());
    }catch(error){
      console.log(error);
      showToast("logout faild","error")
    }
  };
  return (
    <header className={styles.navbarWrapper}>
      <div className={`container ${styles.navbar}`}>
        <Link to="/" className={styles.logo}>
          MasterChef
        </Link>
        <nav className={`${styles.navLinks} ${menuOpen ? styles.active : ""}`}>
          <Link to="/">Home</Link>
          {user && <Link to="/recipes">Recipes</Link>}
          {user && <Link to="/add-recipe">Add Recipe</Link>}
          {user && <Link to={`/profile/${user.id}`}>Profile</Link>}
          {!user ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          ) : (
            <button onClick={handleLogout} className={styles.logoutBtn}>
              Logout
            </button>
          )}
        </nav>
        <div className={styles.menuToggle} onClick={toggleMenu}>
          ☰
        </div>
      </div>
    </header>
  );
}

export default Navbar;