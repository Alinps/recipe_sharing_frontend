import { useEffect } from "react";
import styles from "./Toast.module.css";

function Toast({ message, type = "success", onClose }) {

  useEffect(() => {

    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);

  }, [onClose]);

  if (!message) return null;

  return (

    <div className={`${styles.toast} ${styles[type]}`}>

      <span>{message}</span>

      <button onClick={onClose} className={styles.close}>
        ×
      </button>

    </div>

  );

}

export default Toast;