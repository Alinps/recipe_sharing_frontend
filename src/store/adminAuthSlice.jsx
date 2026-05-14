import { createSlice } from "@reduxjs/toolkit";

const adminToken = localStorage.getItem("adminToken");

const admin = JSON.parse(localStorage.getItem("admin")) || null;

const initialState = {

    token: adminToken,
    admin: admin,
    isAdminAuthenticated: !!adminToken,

}


const adminAuthSlice = createSlice({
    name: "adminAuth",
    initialState,

    reducers: {
        adminLoginSuccess: (state,action) =>{
            
            state.token = action.payload.token;
            state.admin = action.payload.admin;
            state.isAdminAuthenticated = true;

            localStorage.setItem("adminToken", action.payload.token);
            localStorage.setItem("admin",JSON.stringify(action.payload.admin))

        },

        adminLogout: (state) => {
            state.token = null;
            state.admin = null;
            state.isAdminAuthenticated = false;
            localStorage.removeItem("adminToken");
            localStorage.removeItem("admin");
        }
    }
})

export const{
    adminLoginSuccess,
    adminLogout
} =  adminAuthSlice.actions;

export default adminAuthSlice.reducer;
