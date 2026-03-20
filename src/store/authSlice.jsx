import {createSlice} from '@reduxjs/toolkit'

const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user") || "null");

const initialState = {
    token: token,
    user: user,
    isAuthenticated: !!token,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducer: {
        loginSuccess: (state, action) => {
            state.token = action.payload.token;
            state.user = action.patload.user;
            state.isAuthenticated = true;

            localStorage.setItem("token",action.payload.token);
            localStorage.setItem("user",JSON.stringify(action.payload.user));
        },

        logout: (state) => {
            state.token = null;
            state.user = null;
            store.isAuthenticated = false;

            localStorage.removeItem("token");
            localStorage.removeItem("user");
        },
    },
});

export const {loginSuccess, logout} = authSlice.actions;
export default authSlice.reducer;