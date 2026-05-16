import { createContext, useCallback, useEffect, useRef, useState } from "react";
import Toast from "../components/Toast/Toast";

const ToastContext = createContext();

const getToastMessage = (message) => {
  if (typeof message === "string") {
    const trimmed = message.trim();
    return trimmed || "Something went wrong. Please try again.";
  }

  if (Array.isArray(message)) {
    const firstValid = message.find((item) => item !== null && item !== undefined && String(item).trim());
    return firstValid ? String(firstValid) : "Something went wrong. Please try again.";
  }

  if (message && typeof message === "object") {
    if (typeof message.error === "string" && message.error.trim()) {
      return message.error.trim();
    }

    const firstValue = Object.values(message)[0];
    if (Array.isArray(firstValue) && firstValue.length > 0) {
      return String(firstValue[0]);
    }

    if (firstValue !== null && firstValue !== undefined && String(firstValue).trim()) {
      return String(firstValue);
    }
  }

  if (message !== null && message !== undefined && String(message).trim()) {
    return String(message);
  }

  return "Something went wrong. Please try again.";
};

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const showToast = useCallback((message, type = "success") => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setToast({ message: getToastMessage(message), type });
    timerRef.current = setTimeout(() => {
      setToast(null);
    }, 3000);
  }, []);

  const closeToast = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setToast(null);
  };
  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={closeToast}
        />
      )}
    </ToastContext.Provider>
  );
}

export { ToastContext };
