import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ServerWakeup.module.css";
import API from "../../services/api";
function ServerWakeup() {
  const [status, setStatus] = useState("loading"); 
  // loading | success | error
  const navigate = useNavigate();

   useEffect(() => {
    const wakeServer = async () => {
      try {
        const start = Date.now();

        const res = await API.get("health_check/");

        const duration = Date.now() - start;
        console.log("Response time:", duration, "ms");

        if (res.status === 200 && res.data.status === "ok") {
          setStatus("success");

          setTimeout(() => {
            navigate("/landing");
          }, 1000);
        } else {
          setStatus("error");
        }
      } catch (err) {
        console.error("Wakeup failed:", err.message);
        setStatus("error");
      }
    };

    wakeServer();
  }, [navigate]);

  return (
    <div className={`${styles.container}`}>
      {status === "loading" && (
        <>
          <div className={styles.spinner}></div>
          <h2>Waking up server...</h2>
          <p>This may take a few seconds</p>
        </>
      )}

      {status === "success" && (
        <>
          <div className={styles.success}>✓</div>
          <h2>Server Ready</h2>
          <p>Redirecting to login...</p>
        </>
      )}

      {status === "error" && (
        <>
          <div className={styles.error}>✕</div>
          <h2>Something went wrong</h2>
          <p>Please try again later</p>
          <button onClick={() => window.location.reload()}>
            Retry
          </button>
        </>
      )}
    </div>
  );
}

export default ServerWakeup;