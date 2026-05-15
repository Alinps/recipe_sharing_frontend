import { useEffect } from "react";
import styles from "./Toast.module.css";

function Toast({ message, type = "success", onClose }) {

  useEffect(() => {

    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);

  }, [onClose]);

  const safeMessage = message ? String(message) : "Something went wrong. Please try again.";

  return (

    <div className={`${styles.toast} ${styles[type]}`}>

      <span>{safeMessage}</span>

      <button onClick={onClose} className={styles.close}>
        ×
      </button>

    </div>

  );

}

export default Toast;
