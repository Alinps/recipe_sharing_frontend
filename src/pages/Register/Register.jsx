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
       let message = "Failed to connect to API";
        if (error.response?.data){
          const data = error.response.data;

        if (data.error){
          message = data.error;
        } else {
          // handle field errors
          const firstKey = object.keys(data)[0];
          message = data[firstKey][0];
        }
      }
      console.error(message);
      setError(message);
      showToast(message, "error");
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