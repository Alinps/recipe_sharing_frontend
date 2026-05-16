import { createSlice } from '@reduxjs/toolkit';

const token = localStorage.getItem("token");

const parseStoredJson = (key) => {
  const raw = localStorage.getItem(key);

  if (!raw || raw === "undefined" || raw === "null") {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch {
    localStorage.removeItem(key);
    return null;
  }
};

const user = parseStoredJson("user");

const initialState = {
  token,
  user,
  isAuthenticated: !!token,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;

      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },

    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
