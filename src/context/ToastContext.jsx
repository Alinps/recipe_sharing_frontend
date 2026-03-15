import { createContext, useContext, useState } from "react";
import Toast from "../components/Toast/Toast";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);
  let timer;
  const showToast = (message, type = "success") => {
    setToast({ message, type });
      timer = setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const closeToast = () => {
    clearTimeout(timer);
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

export function useToast(){
  return useContext(ToastContext);
}