import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItemsArray,
  selectCartTotalCents,
  selectCartTotalFormatted,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
  selectCartTotalQuantity,
} from "@/features/cart/cartSlice";
import { Link } from "react-router-dom";
import { FaTrash, FaShoppingBag } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

// Helper function to format price from cents
function formatPrice(cents) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

// Image component with loading state
function CartItemImage({ src, alt }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0" style={{ backgroundColor: "var(--color-base-dark-900)" }}>
      {/* Skeleton */}
      {!loaded && !error && src && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-full h-full animate-pulse"
            style={{ backgroundColor: "var(--color-base-dark-800)" }}
          >
            <div className="w-full h-full flex items-center justify-center">
              <div
                className="w-8 h-8 rounded-full border-4 border-t-transparent animate-spin"
                style={{
                  borderColor: "var(--color-base-dark-700)",
                  borderTopColor: "transparent",
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Image */}
      {src && !error ? (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-contain p-2 transition-all duration-500 ${
            loaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
          onLoad={() => setLoaded(true)}
          onError={() => {
            setError(true);
            setLoaded(false);
          }}
        />
      ) : (
        <div
          className="w-full h-full flex items-center justify-center text-xs"
          style={{ color: "var(--color-base-dark-500)" }}
        >
          No image
        </div>
      )}
    </div>
  );
}

export default function Cart() {
  const cartItems = useSelector(selectCartItemsArray);
  const numOfItems = useSelector(selectCartTotalQuantity);
  const cartTotalCents = useSelector(selectCartTotalCents);
  const dispatch = useDispatch();

  const handleIncrease = (id) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecrease = (id) => {
    dispatch(decreaseQuantity(id));
  };

  const handleRemove = (id) => {
    dispatch(removeItem(id));
  };

  // Calculate tax (10%)
  const taxCents = Math.round(cartTotalCents * 0.1);
  const totalWithTaxCents = cartTotalCents + taxCents;

  // Empty cart state
  if (numOfItems === 0) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          backgroundColor: "var(--color-base-dark-900)",
          paddingTop: "80px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <FaShoppingBag
            size={80}
            className="mx-auto mb-6 opacity-50"
            style={{ color: "var(--color-base-dark-500)" }}
          />
          <h2
            className="text-3xl font-bold mb-4"
            style={{ color: "var(--color-base-dark-300)" }}
          >
            Your Cart is Empty
          </h2>
          <p
            className="text-lg mb-8"
            style={{ color: "var(--color-base-dark-500)" }}
          >
            Add some products to get started!
          </p>
          <Link
            to="/shop"
            className="inline-block px-8 py-3 rounded-lg font-semibold transition-all hover:scale-105"
            style={{
              backgroundColor: "var(--color-accent-primary-DEFAULT)",
              color: "var(--color-base-dark-900)",
            }}
          >
            Continue Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen px-4 sm:px-6 lg:px-8 pb-12"
      style={{
        backgroundColor: "var(--color-base-dark-900)",
        paddingTop: "calc(64px + 2rem)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1
            className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-2 bg-clip-text text-transparent"
            style={{ backgroundImage: "var(--gradient-brand)" }}
          >
            Shopping Cart
          </h1>
          <p style={{ color: "var(--color-base-dark-400)" }}>
            {numOfItems} {numOfItems === 1 ? "item" : "items"} in your cart
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="popLayout">
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="mb-4 p-4 sm:p-6 rounded-2xl border backdrop-blur-sm transition-all hover:shadow-lg"
                  style={{
                    backgroundColor: "color-mix(in srgb, var(--color-base-dark-800) 80%, transparent)",
                    borderColor: "var(--color-base-dark-700)",
                  }}
                >
                  <div className="flex gap-4 sm:gap-6">
                    {/* Image */}
                    <CartItemImage src={item.image} alt={item.title} />

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h3
                        className="font-semibold text-base sm:text-lg mb-2 line-clamp-2"
                        style={{ color: "var(--color-base-dark-300)" }}
                      >
                        {item.title}
                      </h3>

                      <p
                        className="text-xl font-bold mb-4"
                        style={{ color: "var(--color-accent-primary-light)" }}
                      >
                        {formatPrice(item.priceCents)}
                      </p>

                      {/* Controls */}
                      <div className="flex items-center justify-between flex-wrap gap-3">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleDecrease(item.id)}
                            className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg text-lg font-bold transition-all border hover:scale-110"
                            style={{
                              borderColor: "var(--color-base-dark-700)",
                              color: "var(--color-base-dark-300)",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = "var(--color-base-dark-700)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = "transparent";
                            }}
                          >
                            −
                          </button>
                          <span
                            className="text-lg font-semibold min-w-[32px] text-center"
                            style={{ color: "var(--color-accent-primary-light)" }}
                          >
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleIncrease(item.id)}
                            className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg text-lg font-bold transition-all border hover:scale-110"
                            style={{
                              borderColor: "var(--color-base-dark-700)",
                              color: "var(--color-base-dark-300)",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = "var(--color-base-dark-700)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = "transparent";
                            }}
                          >
                            +
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => handleRemove(item.id)}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:scale-105"
                          style={{
                            color: "var(--color-accent-secondary-light)",
                            backgroundColor: "color-mix(in srgb, var(--color-accent-secondary-DEFAULT) 20%, transparent)",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "var(--color-accent-secondary-dark)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "color-mix(in srgb, var(--color-accent-secondary-DEFAULT) 20%, transparent)";
                          }}
                        >
                          <FaTrash size={14} />
                          <span className="hidden sm:inline">Remove</span>
                        </button>
                      </div>

                      {/* Subtotal */}
                      <div className="mt-3 pt-3 border-t" style={{ borderColor: "var(--color-base-dark-700)" }}>
                        <div className="flex justify-between items-center">
                          <span
                            className="text-sm"
                            style={{ color: "var(--color-base-dark-400)" }}
                          >
                            Subtotal:
                          </span>
                          <span
                            className="text-lg font-bold"
                            style={{ color: "var(--color-accent-primary-light)" }}
                          >
                            {formatPrice(item.priceCents * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div
              className="sticky top-24 p-6 rounded-2xl border backdrop-blur-lg"
              style={{
                backgroundColor: "color-mix(in srgb, var(--color-base-dark-800) 90%, transparent)",
                borderColor: "var(--color-base-dark-700)",
              }}
            >
              <h2
                className="text-2xl font-bold mb-6"
                style={{ color: "var(--color-base-dark-300)" }}
              >
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span style={{ color: "var(--color-base-dark-400)" }}>
                    Subtotal
                  </span>
                  <span
                    className="font-semibold"
                    style={{ color: "var(--color-base-dark-300)" }}
                  >
                    {formatPrice(cartTotalCents)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "var(--color-base-dark-400)" }}>
                    Shipping
                  </span>
                  <span
                    className="font-semibold"
                    style={{ color: "var(--color-accent-tertiary-DEFAULT)" }}
                  >
                    FREE
                  </span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "var(--color-base-dark-400)" }}>
                    Tax (estimated)
                  </span>
                  <span
                    className="font-semibold"
                    style={{ color: "var(--color-base-dark-300)" }}
                  >
                    {formatPrice(taxCents)}
                  </span>
                </div>
              </div>

              <div
                className="pt-4 mb-6 border-t"
                style={{ borderColor: "var(--color-base-dark-700)" }}
              >
                <div className="flex justify-between items-center">
                  <span
                    className="text-lg font-bold"
                    style={{ color: "var(--color-base-dark-300)" }}
                  >
                    Total
                  </span>
                  <span
                    className="text-2xl font-extrabold"
                    style={{ color: "var(--color-accent-primary-light)" }}
                  >
                    {formatPrice(totalWithTaxCents)}
                  </span>
                </div>
              </div>

              <button
                className="w-full py-3 rounded-lg font-bold text-lg transition-all hover:scale-105 shadow-lg mb-3"
                style={{
                  backgroundColor: "var(--color-accent-primary-DEFAULT)",
                  color: "var(--color-base-dark-900)",
                }}
              >
                Proceed to Checkout
              </button>

              <Link
                to="/shop"
                className="block text-center py-2 rounded-lg font-semibold transition-all hover:scale-105"
                style={{
                  color: "var(--color-accent-primary-light)",
                }}
              >
                Continue Shopping
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}