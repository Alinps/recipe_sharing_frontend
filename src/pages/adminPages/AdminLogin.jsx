import { useState } from "react";
import API from "../../services/api"
import { useDispatch } from "react-redux";
import { adminLoginSuccess } from "../../store/adminAuthSlice";
import { useToast } from "../../context/useToast";
import { useNavigate } from "react-router-dom";


function AdminLogin(){
    let [email,setEmail] = useState('');
    let [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const {showToast} = useToast();
    const navigate = useNavigate();

    let handleSubmit = async (e) => {

        e.preventDefault();

        try {

            let data = {"email":email,"password":password};
            const response = await API.post("user_admin/admin_login/",data);
            dispatch(adminLoginSuccess(response.data));
            showToast("Admin Login Successfull","success");
            navigate("/admin/dashboard");

    } catch(error){

        let message = "Failed to connect to API";

        if (error.response?.data){

            const data = error.response.data;
            
        
            if(data.error){

                 message = data.error;
                 

            } else {

                const firstKey = Object.keys(data)[0];
                const value = data[firstKey];
                message = Array.isArray(value) ? value[0] : value;

             }
    }
    console.log(message)
    showToast(message, "error");
}
}

 return (
    <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="card shadow p-4 border-0" style={{ width: "400px" }}>
        
        <div className="text-center mb-4">
          <h2 className="fw-bold">Admin Login</h2>
          <p className="text-muted mb-0">
            Sign in to access admin dashboard
          </p>
        </div>
        

        <form onSubmit={handleSubmit}>
          
          <div className="mb-3">
            <label className="form-label fw-semibold">
              Email Address
            </label>

            <input
              type="email"
              className="form-control"
              placeholder="Enter admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          
          <div className="mb-4">
            <label className="form-label fw-semibold">
              Password
            </label>

            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          
          <button
            type="submit"
            className="btn btn-dark w-100"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;