import { createSlice } from "@reduxjs/toolkit";
import {
  clearCart,
  hydrateCart,
} from "../cart/cartSlice";
import { userStorage, cartStorage } from "@/utils/localStorage";

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
      const users = userStorage.getAllUsers();

      if (users.find((u) => u.email === email)) {
        throw new Error("User already exists");
      }

      const newUser = { email, username, password };
      users.push(newUser);
      userStorage.saveAllUsers(users);
      userStorage.saveCurrentUser(newUser);
      cartStorage.saveUserCart(email, { itemsById: {}, ids: [] });

      state.isLoggedIn = true;
      state.user = newUser;
    },

    login: (state, action) => {
      const { email, password } = action.payload;
      const users = userStorage.getAllUsers();
      const existingUser = users.find(
        (u) => u.email === email && u.password === password
      );

      if (!existingUser) throw new Error("Invalid credentials");

      userStorage.saveCurrentUser(existingUser);
      state.isLoggedIn = true;
      state.user = existingUser;
    },

    logout: (state) => {
      userStorage.removeCurrentUser();
      state.isLoggedIn = false;
      state.user = null;
    },

    loadUserFromStorage: (state) => {
      const storedUser = userStorage.getCurrentUser();
      if (storedUser) {
        state.isLoggedIn = true;
        state.user = storedUser;
      }
    },
  },
});

export const { signup, login, logout, loadUserFromStorage } = authSlice.actions;

// Async Thunks 
export const performLogin = (credentials) => (dispatch) => {
  dispatch(login(credentials));
  const user = userStorage.getCurrentUser();
  if (user) {
    const savedCart = cartStorage.getUserCart(user.email);
    dispatch(hydrateCart(savedCart));
  }
};

export const performLogout = () => (dispatch, getState) => {
  const { auth, cart } = getState();
  if (auth.user) cartStorage.saveUserCart(auth.user.email, cart);
  dispatch(logout());
  dispatch(clearCart());
};

export default authSlice.reducer;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectUser = (state) => state.auth.user;
