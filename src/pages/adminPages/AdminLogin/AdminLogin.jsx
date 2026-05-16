import { useState } from "react";
import API from "../../../services/api";
import { useDispatch } from "react-redux";
import { adminLoginSuccess } from "../../../store/adminAuthSlice";
import { useToast } from "../../../context/useToast";
import { useNavigate } from "react-router-dom";
import styles from "./AdminLogin.module.css";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = { email, password };
      const response = await API.post("user_admin/admin_login/", data);
      dispatch(adminLoginSuccess(response.data));
      showToast("Admin Login Successfull", "success");
      navigate("/admin/dashboard");
    } catch (error) {
      let message = "Failed to connect to API";

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

      showToast(message, "error");
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h2 className={styles.title}>Admin Login</h2>
          <p className={styles.subtitle}>Sign in to access admin dashboard</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label className={styles.label}>Email Address</label>
            <input
              type="email"
              className={styles.input}
              placeholder="Enter admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Password</label>
            <input
              type="password"
              className={styles.input}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className={styles.submit}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
