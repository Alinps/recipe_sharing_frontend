import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function AdminPublicRoute({ children }) {

  const isAdminAuthenticated = useSelector(
    (state) => state.adminAuth.isAdminAuthenticated
  );

  return isAdminAuthenticated
    ? <Navigate to="/admin/dashboard" />
    : children;
}

export default AdminPublicRoute;