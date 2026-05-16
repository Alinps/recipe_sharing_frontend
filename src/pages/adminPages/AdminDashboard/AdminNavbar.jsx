import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { adminLogout } from "../../../store/adminAuthSlice";
import { useToast } from "../../../context/useToast";
import styles from "./AdminNavbar.module.css";

function AdminNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleLogout = () => {
    dispatch(adminLogout());
    showToast("Logged out successfully", "success");
    navigate("/admin_login");
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.inner}>
        <h2 className={styles.brand}>MasterChef Admin</h2>

        <nav className={styles.links}>
          <NavLink
            to="/admin/dashboard"
            end
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ""}`
            }
          >
            Users
          </NavLink>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
}

export default AdminNavbar;
