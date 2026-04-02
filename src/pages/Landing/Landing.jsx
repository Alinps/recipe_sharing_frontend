import { Link } from "react-router-dom";
import styles from "./Landing.module.css";
import { useState } from "react";
import Modal from "../../components/Modal/Modal";
import Login from "../Login/Login";
import Register from "../Register/Register";

function Landing() {
  const [showLogin, setShowLogin] = useState(false);
   const [showRegister, setShowRegister] = useState(false);
  return (
    <div className={styles.pageReset}>
    <div className={styles.landing}>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <h1 className={styles.title}>MasterChef</h1>
        <p className={styles.subtitle}>
          Discover, create, and share amazing recipes with the world.
        </p>

        <div className={styles.actions}>
          <button className={styles.loginBtn} onClick={() => setShowLogin(true)}>
            Log In
         </button>
          <button  to="/register" className={styles.registerBtn} onClick={() => setShowRegister(true)}>
            Create Account
          </button>
          {showLogin && (
            <Modal onClose={() => setShowLogin(false)}>
             <Login onSuccess={() => setShowLogin(false)} />
            </Modal>
          )}

            {showRegister && (
            <Modal onClose={() => setShowRegister(false)}>
             <Register onSuccess={() => setShowRegister(false)} />
            </Modal>
          )}

        </div>
      </div>
    </div>
    </div>
  );

}

export default Landing;