import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addItem,
  increaseQuantity,
  decreaseQuantity,
  selectCartItemsArray,
} from "@/features/cart/cartSlice";
import { selectIsLoggedIn } from "@/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const cartItems = useSelector(selectCartItemsArray);
  const cartItem = cartItems.find((item) => item.id === String(product.id));

  const formatPrice = (value) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(Number(value || 0));

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      navigate("/login", { state: { from: { pathname: "/shop" } } });
      return;
    }
    dispatch(addItem({ product, quantity: 1 }));
  };

  const handleIncrease = () => {
    dispatch(increaseQuantity(product.id));
  };

  const handleDecrease = () => {
    dispatch(decreaseQuantity(product.id));
  };

  const imageSrc = product?.image || null;

  return (
    <article
      className="
        w-[260px] sm:w-[300px] md:w-[320px] lg:w-[340px]
        h-[380px]
        flex flex-col overflow-hidden
        rounded-2xl border shadow-lg
        transition-all duration-300 transform
        hover:-translate-y-2 hover:shadow-xl
      "
      style={{
        backgroundColor: "var(--color-base-dark-800)",
        borderColor: "var(--color-base-dark-700)",
      }}
    >
      {/* Image */}
      <div
        className="relative flex-shrink-0 h-48 flex items-center justify-center p-4 overflow-hidden"
        style={{
          backgroundColor: "var(--color-base-dark-900)",
        }}
      >
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={product.title || "Product image"}
            loading="lazy"
            className="max-h-full max-w-full object-contain transition-transform duration-500 hover:scale-105"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-sm"
            style={{ color: "var(--color-base-dark-400)" }}
          >
            No image
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <h3
          className="font-semibold leading-tight line-clamp-2 mb-3"
          style={{ color: "var(--color-base-dark-300)" }}
        >
          {product.title}
        </h3>

        <div className="mt-auto flex items-center justify-between">
          <span
            className="text-lg font-bold"
            style={{ color: "var(--color-accent-primary-light)" }}
          >
            {formatPrice(product.price)}
          </span>

          {!cartItem ? (
            <button
              onClick={handleAddToCart}
              className="
                ml-2 px-3 py-2 rounded-lg text-sm font-semibold
                transition-all border-2
              "
              style={{
                color: "var(--color-accent-primary-light)",
                borderColor: "var(--color-accent-primary-dark)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "var(--color-accent-primary-dark)";
                e.currentTarget.style.color = "var(--color-base-dark-900)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color =
                  "var(--color-accent-primary-light)";
              }}
            >
              Add To Cart
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={handleDecrease}
                className="
                  w-8 h-8 flex items-center justify-center
                  rounded-lg text-lg font-bold transition-all border
                "
                style={{
                  borderColor: "var(--color-base-dark-700)",
                  color: "var(--color-base-dark-300)",
                }}
              >
                −
              </button>
              <span
                className="text-sm font-semibold"
                style={{ color: "var(--color-accent-primary-light)" }}
              >
                {cartItem.quantity}
              </span>
              <button
                onClick={handleIncrease}
                className="
                  w-8 h-8 flex items-center justify-center
                  rounded-lg text-lg font-bold transition-all border
                "
                style={{
                  borderColor: "var(--color-base-dark-700)",
                  color: "var(--color-base-dark-300)",
                }}
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
