import { useState } from "react";
import API from "../../services/api";
import styles from "./ChangePassword.module.css";
import { Eye, EyeOff } from "lucide-react";
import { useToast } from "../../context/ToastContext";

function ChangePassword() {
  const [form, setForm] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });
  const { showToast } = useToast();
  const [show, setShow] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  //Password strength
  const getStrength = (password) => {
    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) return "weak";
    if (score === 3 || score === 4) return "medium";
    return "strong";
  };

  const strength = getStrength(form.new_password);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const toggleShow = (field) => {
    setShow({ ...show, [field]: !show[field] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (form.new_password !== form.confirm_password) {
      return showToast("Passwords do not match","error");
    }

    setLoading(true);

    try {
      const res = await API.post("password_change/", {
        current_password: form.current_password,
        new_password: form.new_password,
      });

      setMessage(res.data.message);
      setForm({
        current_password: "",
        new_password: "",
        confirm_password: "",
      });

    } catch (err) {
      showToast("Something went wrong");
      setMessage(
        err.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h2 className={styles.title}>Change Password</h2>

        <form onSubmit={handleSubmit} className={styles.form}>

          {/* CURRENT PASSWORD */}
          <div className={styles.field}>
            <label>Current Password</label>
            <div className={styles.inputWrapper}>
              <input
                type={show.current ? "text" : "password"}
                name="current_password"
                value={form.current_password}
                onChange={handleChange}
                required
              />
              <span onClick={() => toggleShow("current")}>
                {show.current ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
          </div>

          {/* NEW PASSWORD */}
          <div className={styles.field}>
            <label>New Password</label>
            <div className={styles.inputWrapper}>
              <input
                type={show.new ? <EyeOff size={18} /> : <Eye size={18} />}
                name="new_password"
                value={form.new_password}
                onChange={handleChange}
                required
              />
              <span onClick={() => toggleShow("new")}>
                {show.new ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
          </div>

          {/*STRENGTH BAR */}
          {form.new_password && (
            <div className={styles.strength}>
              <div className={`${styles.bar} ${styles[strength]}`}></div>
              <p>{strength.toUpperCase()} password</p>
            </div>
          )}

          {/* CONFIRM PASSWORD */}
          <div className={styles.field}>
            <label>Confirm Password</label>
            <div className={styles.inputWrapper}>
              <input
                type={show.confirm ? "text" : "password"}
                name="confirm_password"
                value={form.confirm_password}
                onChange={handleChange}
                required
              />
              <span onClick={() => toggleShow("confirm")}>
                {show.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
          </div>

          {/* RULES */}
          <div className={styles.rules}>
            <ul>
              <li className={form.new_password.length >= 8 ? styles.valid : ""}>
                At least 8 characters
              </li>
              <li className={/[0-9]/.test(form.new_password) ? styles.valid : ""}>
                Contains a number
              </li>
              <li className={/[A-Z]/.test(form.new_password) ? styles.valid : ""}>
                Contains uppercase letter
              </li>
              <li className={/[a-z]/.test(form.new_password) ? styles.valid : ""}>
                Contains lowercase letter
              </li>
            </ul>
          </div>

          {/* BUTTON */}
          <button className={styles.submitBtn} disabled={loading}>
            {loading && <span className={styles.spinner}></span>}
            {loading ? "Updating..." : "Change Password"}
          </button>

          {/* MESSAGE */}
          {/* {message && <p className={styles.message}>{message}</p>} */}

        </form>
      </div>
    </div>
  );
}

export default ChangePassword;