import { useState } from "react";
import styles from "./Login.module.css";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../context/ToastContext";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../store/authSlice";
function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showToast } = useToast();


   const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        let data = {
        "email":email,
        "password":password,
    }
      const response = await API.post("login_user/", data);
      const token = response.data.token;
      console.log(token)
      dispatch(loginSuccess(response.data))
      // localStorage.setItem("user", JSON.stringify(res.data.user));
      showToast("Login successful!", "success");
      navigate("/");
    }catch (error) {
        if (error) {
            console.log(error);
            showToast("Invalid credentials", "error");
        } else {
            showToast("Failed to connect  to API", "error");
        }
    }
  };

  return (

    <div className="container">
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

    </div>

  );

}

export default Login;