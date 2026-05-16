import { createSlice } from "@reduxjs/toolkit";

const adminToken = localStorage.getItem("adminToken");

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

const admin = parseStoredJson("admin");

const initialState = {
  token: adminToken,
  admin,
  isAdminAuthenticated: !!adminToken,
};

const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState,

  reducers: {
    adminLoginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.admin = action.payload.admin;
      state.isAdminAuthenticated = true;

      localStorage.setItem("adminToken", action.payload.token);
      localStorage.setItem("admin", JSON.stringify(action.payload.admin));
    },

    adminLogout: (state) => {
      state.token = null;
      state.admin = null;
      state.isAdminAuthenticated = false;
      localStorage.removeItem("adminToken");
      localStorage.removeItem("admin");
    },
  },
});

export const { adminLoginSuccess, adminLogout } = adminAuthSlice.actions;

export default adminAuthSlice.reducer;
