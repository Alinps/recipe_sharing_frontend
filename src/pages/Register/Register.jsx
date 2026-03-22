import { useState } from "react";
import styles from "./Register.module.css";
import API from "../../services/api"
import { useNavigate } from "react-router-dom";
import { useToast } from "../../context/ToastContext";
function Register({ onSuccess }) {

  const [formData, setFormData] = useState({
    name:"",
    email:"",
    password:""
  });
  const [error,setError] = useState("");
  const navigate = useNavigate();
  const { showToast } = useToast();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

 const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("signup/", formData);
      showToast("Registration successful", "success");
      onSuccess(); 
      navigate("/");
      console.log(response.data);
    }catch (error) {
        if (error.response && error.response.data) {
            console.log(error);
            setError(error.response.data.error);
             showToast("error.response.data.error", "error");
        } else {
            setError("Failed to connect API");
        }
    }
  };


  return (
      <section className={styles.wrapper}>
        <div className={styles.card}>
          <h2 className={styles.title}>Create Account</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.field}>
              <label>Name</label>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.field}>
              <label>Email</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.field}>
              <label>Password</label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn">
              Register
            </button>
          </form>
        </div>
      </section>
  );
}

export default Register;