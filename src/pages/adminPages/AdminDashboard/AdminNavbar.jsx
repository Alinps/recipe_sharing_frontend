import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { adminLogout } from "../../../store/adminAuthSlice";
import { useToast } from "../../../context/useToast";
import styles from "./AdminNavbar.module.css";
import API from "../../../services/api";

function AdminNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const handleLogout = async () => {

    try{

    const response = await API.post("/user_admin/logout/")
    const payload = response.data?.data ?? response.data;
    const successMessage = payload?.message || "Logged out successfully";
    dispatch(adminLogout());
    showToast(successMessage, "success");
    navigate("/admin_login");

    } catch (error) {
       let message = "Something went wrong";

        if (error.response?.data) {
          const data = error.response.data;

          if (data.error) {
            message = data.error;
          } else {
            const firstKey = Object.keys(data)[0];
            const value = data[firstKey];
            message = Array.isArray(value) ? value[0] : value;
          }
        }
        dispatch(adminLogout());
        showToast(message, "error");
        navigate("/admin_login");
    }
   
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
