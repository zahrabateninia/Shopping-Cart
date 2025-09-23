import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signup: (state, action) => {
      const { email, password, username } = action.payload;
      const users = JSON.parse(localStorage.getItem("users") || "[]");

      if (users.find((u) => u.email === email)) {
        throw new Error("User already exists");
      }

      const newUser = { email, username, password };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("user", JSON.stringify(newUser));

      state.isLoggedIn = true;
      state.user = newUser;
    },
    login: (state, action) => {
      const { email, password } = action.payload;
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const existingUser = users.find(
        (u) => u.email === email && u.password === password
      );

      if (!existingUser) {
        throw new Error("Invalid credentials");
      }

      localStorage.setItem("user", JSON.stringify(existingUser));
      state.isLoggedIn = true;
      state.user = existingUser;
    },
    logout: (state) => {
      localStorage.removeItem("user");
      state.isLoggedIn = false;
      state.user = null;
    },
    loadUserFromStorage: (state) => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        state.isLoggedIn = true;
        state.user = JSON.parse(storedUser);
      }
    },
  },
});

export const { signup, login, logout, loadUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectUser = (state) => state.auth.user;
