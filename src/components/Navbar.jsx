import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectCartTotalQuantity } from "@/features/cart/cartSlice";
import { performLogout } from "@/features/auth/authSlice";
import React from "react";
import toast from "react-hot-toast";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  const totalItems = useSelector(selectCartTotalQuantity);
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(performLogout());
    navigate("/");
    toast.success("You are logged out!");
  };

  return (
    <nav
      className="fixed top-0 left-0 z-50 w-full flex justify-between items-center px-8 py-4 backdrop-blur-lg shadow-lg border-b transition-all"
      style={{
        backgroundColor: "color-mix(in srgb, var(--color-base-dark-900) 70%, transparent)",
        borderColor: "var(--color-base-dark-800)",
      }}
    >
      {/* logo*/}
      <Link
        to="/"
        className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent"
        style={{
          backgroundImage: "var(--gradient-brand)",
        }}
      >
        ShopEase
      </Link>

      {/* navbar links */}
      <div
        className="flex gap-8 items-center text-sm font-semibold uppercase tracking-wide"
        style={{ color: "var(--color-base-dark-300)" }}
      >
        <Link
          to="/"
          className="transition-all hover:text-[var(--color-accent-primary-light)] hover:scale-105"
        >
          Home
        </Link>
        <Link
          to="/shop"
          className="transition-all hover:text-[var(--color-accent-primary-light)] hover:scale-105"
        >
          Shop
        </Link>

      
        <Link
          to="/cart"
          className="relative flex items-center transition-all hover:text-[var(--color-accent-primary-light)] hover:scale-110"
        >
          <FaShoppingCart size={22} />
          {totalItems > 0 && (
            <span
              className="absolute -top-2 -right-2 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md"
              style={{
                backgroundColor: "var(--color-accent-tertiary-DEFAULT)",
                color: "var(--color-base-dark-900)",
              }}
            >
              {totalItems}
            </span>
          )}
        </Link>
      </div>

      {/* auth button */}
      {isLoggedIn ? (
        <button
          onClick={handleLogout}
          className="px-5 py-2 rounded-lg font-semibold transition-all shadow-md"
          style={{
            backgroundColor: "var(--color-accent-primary-DEFAULT)",
            color: "var(--color-base-dark-900)",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor =
              "var(--color-accent-primary-hover)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor =
              "var(--color-accent-primary-DEFAULT)")
          }
        >
          Logout {user?.username && `(${user.username})`}
        </button>
      ) : (
        <Link
          to="/login"
          className="px-5 py-2 rounded-lg font-semibold transition-all shadow-md"
          style={{
            backgroundColor: "var(--color-accent-secondary-DEFAULT)",
            color: "var(--color-base-dark-900)",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor =
              "var(--color-accent-secondary-hover)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor =
              "var(--color-accent-secondary-DEFAULT)")
          }
        >
          Login
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
