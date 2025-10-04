import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItemsArray,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
  selectCartTotalFormatted,
} from "@/features/cart/cartSlice";
import { Link } from "react-router-dom";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function Cart() {
  const cartItems = useSelector(selectCartItemsArray);
  const totalFormatted = useSelector(selectCartTotalFormatted);
  const dispatch = useDispatch();

  const handleIncrease = (id) => dispatch(increaseQuantity(id));
  const handleDecrease = (id, quantity) => {
    if (quantity <= 1) {
      dispatch(removeItem(id));
    } else {
      dispatch(decreaseQuantity(id));
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-4 text-center bg-base-dark-900 text-white">
        <h2 className="text-3xl font-bold text-accent-primary-DEFAULT mb-4">
          Your cart is empty
        </h2>
        <Link
          to="/shop"
          className="mt-4 inline-block bg-accent-primary-DEFAULT hover:bg-accent-primary-dark text-gray-900 font-bold px-6 py-3 rounded-full transition-all"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] px-4 md:px-16 py-8 bg-base-dark-900 text-white">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-accent-primary-DEFAULT">
        Your Cart
      </h1>

      <div className="max-w-6xl mx-auto space-y-6">
        <AnimatePresence>
          {cartItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col md:flex-row items-center md:items-start justify-between p-6 bg-base-dark-800 rounded-2xl shadow-lg border border-base-dark-700 transition-all"
            >
              {/* Product Image */}
              <div className="w-32 h-32 md:w-40 md:h-40 flex-shrink-0 bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.title}
                  className="object-contain w-full h-full"
                />
              </div>

              {/* Product Details */}
              <div className="flex-1 md:ml-6 mt-4 md:mt-0 flex flex-col justify-between">
                <h2 className="text-xl md:text-2xl font-semibold text-accent-primary-300">
                  {item.title}
                </h2>
                <span className="text-lg font-bold text-accent-primary-DEFAULT mt-2 md:mt-4">
                  ${(item.priceCents * item.quantity / 100).toFixed(2)}
                </span>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-2 mt-4 md:mt-0">
                <button
                  onClick={() => handleDecrease(item.id, item.quantity)}
                  className="w-10 h-10 flex items-center justify-center rounded-lg border border-base-dark-700 hover:bg-base-dark-700 transition-colors"
                >
                  <FaMinus />
                </button>
                <span className="text-lg font-semibold w-8 text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() => handleIncrease(item.id)}
                  className="w-10 h-10 flex items-center justify-center rounded-lg border border-base-dark-700 hover:bg-base-dark-700 transition-colors"
                >
                  <FaPlus />
                </button>
                <button
                  onClick={() => dispatch(removeItem(item.id))}
                  className="ml-4 w-12 h-12 flex items-center justify-center  text-accent-secondary-DEFAULT hover:text-white transition-colors"
                >
                  <FaTrash className="text-accent-secondary-DEFAULT"/>
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Total */}
        <div className="flex justify-end mt-8">
          <span className="text-2xl font-bold text-accent-secondary-DEFAULT">
            Total: {totalFormatted}
          </span>
        </div>
      </div>
    </div>
  );
}
