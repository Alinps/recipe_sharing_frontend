import { useState } from "react";
import styles from "./Login.module.css";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../context/ToastContext";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../store/authSlice";
function Login({ onSuccess }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showToast } = useToast();


   const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let data = {"email":email,"password":password,}
      const response = await API.post("login_user/", data);
      dispatch(loginSuccess(response.data));
      showToast("Login successful!", "success");
      onSuccess(); 
      navigate("/home");
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
      showToast(message, "error");
    }
  };

  return (

      <section className={styles.wrapper}>
        <div className={styles.card}>

          <h2 className={styles.title}>Login</h2>

          <form onSubmit={handleSubmit} className={styles.form}>

            <div className={styles.field}>
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e)=>{setEmail(e.target.value);}}
                required
              />
            </div>

            <div className={styles.field}>
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e)=>{setPassword(e.target.value);}}
                required
              />
            </div>

            <button type="submit" className="btn">
              Login
            </button>

          </form>

        </div>

      </section>



  );

}

export default Login;