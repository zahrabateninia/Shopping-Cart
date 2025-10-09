import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUserFromStorage, selectUser } from "@/features/auth/authSlice";
import {
  hydrateCart,
  loadCartForUser,
  clearCart,
  saveCartForUser,
  selectCartItemsArray,
} from "@/features/cart/cartSlice";

import Navbar from "@/components/Navbar";
import Home from "@/pages/Home";
import Shop from "@/pages/Shop";
import Cart from "@/pages/Cart";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

export default function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const cartItems = useSelector(selectCartItemsArray);

  // Load user from storage
  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  // Hydrate the correct cart when user changes
  useEffect(() => {
    if (user?.email) {
      const savedCart = loadCartForUser(user.email);
      dispatch(hydrateCart(savedCart));
    } else {
      dispatch(clearCart());
    }
  }, [user, dispatch]);

  // Persist cart changes to localStorage for the current user
  useEffect(() => {
    if (user?.email) {
      // Debounce-like save to prevent excessive writes
      const timeout = setTimeout(() => {
        const cartState = {
          itemsById: {},
          ids: [],
        };
        cartItems.forEach((item) => {
          cartState.itemsById[item.id] = item;
          cartState.ids.push(item.id);
        });
        saveCartForUser(user.email, cartState);
      }, 300);

      return () => clearTimeout(timeout);
    }
  }, [cartItems, user]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 overflow-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>
      <Footer />
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}
