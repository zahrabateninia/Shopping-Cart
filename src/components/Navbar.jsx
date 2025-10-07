import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectCartTotalQuantity } from "@/features/cart/cartSlice";
import { performLogout } from "@/features/auth/authSlice";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const totalItems = useSelector(selectCartTotalQuantity);
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(performLogout());
    navigate("/");
    toast.success("You are logged out!");
    setIsMenuOpen(false);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Shared classes for consistent hover effects
  const navLinkClasses = "transition-all hover:text-[var(--color-accent-primary-light)] hover:scale-105";
  const iconClasses = "transition-all hover:text-[var(--color-accent-primary-light)] hover:scale-110";

  return (
    <nav
      className="fixed top-0 left-0 z-50 w-full flex justify-between items-center px-4 sm:px-8 py-4 backdrop-blur-lg shadow-lg border-b transition-all"
      style={{
        backgroundColor: "color-mix(in srgb, var(--color-base-dark-900) 70%, transparent)",
        borderColor: "var(--color-base-dark-800)",
      }}
    >
      {/* Logo */}
      <Link
        to="/"
        className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-clip-text text-transparent z-50 transition-all hover:scale-105"
        style={{
          backgroundImage: "var(--gradient-brand)",
        }}
        onClick={closeMenu}
      >
        ShopEase
      </Link>

      {/* Desktop nav*/}
      <div
        className="hidden md:flex gap-8 items-center text-sm font-semibold uppercase tracking-wide"
        style={{ color: "var(--color-base-dark-300)" }}
      >
        <Link to="/" className={navLinkClasses}>
          Home
        </Link>
        <Link to="/shop" className={navLinkClasses}>
          Shop
        </Link>
        <Link to="/cart" className={`relative flex items-center ${iconClasses}`}>
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

      {/* Desktop Auth Button */}
      <div className="hidden md:block">
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="px-5 py-2 rounded-lg font-semibold transition-all shadow-md hover:scale-105"
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
            className="px-5 py-2 rounded-lg font-semibold transition-all shadow-md hover:scale-105"
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
      </div>

      {/* Mobile Right Section: Cart + Hamburger */}
      <div className="md:hidden flex items-center gap-4 z-50">
        {/* Mobile Cart Icon */}
        <Link
          to="/cart"
          className={`relative flex items-center ${iconClasses}`}
          style={{ color: "var(--color-base-dark-300)" }}
        >
          <FaShoppingCart size={20} />
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

        <button
          className={iconClasses}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{ color: "var(--color-base-dark-300)" }}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-0 right-0 h-screen w-64 backdrop-blur-lg shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          backgroundColor: "color-mix(in srgb, var(--color-base-dark-900) 90%, transparent)",
          borderLeft: "1px solid var(--color-base-dark-800)",
        }}
      >
        <div className="flex flex-col gap-6 pt-20 px-6">
          <Link
            to="/"
            className={`text-lg font-semibold uppercase tracking-wide ${navLinkClasses}`}
            style={{ color: "var(--color-base-dark-300)" }}
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link
            to="/shop"
            className={`text-lg font-semibold uppercase tracking-wide ${navLinkClasses}`}
            style={{ color: "var(--color-base-dark-300)" }}
            onClick={closeMenu}
          >
            Shop
          </Link>
          <Link
            to="/cart"
            className={`text-lg font-semibold uppercase tracking-wide ${navLinkClasses} flex items-center gap-2`}
            style={{ color: "var(--color-base-dark-300)" }}
            onClick={closeMenu}
          >
            Cart
            {totalItems > 0 && (
              <span
                className="text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-md"
                style={{
                  backgroundColor: "var(--color-accent-tertiary-DEFAULT)",
                  color: "var(--color-base-dark-900)",
                }}
              >
                {totalItems}
              </span>
            )}
          </Link>

          <div className="mt-6 pt-6 border-t" style={{ borderColor: "var(--color-base-dark-800)" }}>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="w-full px-5 py-3 rounded-lg font-semibold transition-all shadow-md hover:scale-105"
                style={{
                  backgroundColor: "var(--color-accent-primary-DEFAULT)",
                  color: "var(--color-base-dark-900)",
                }}
              >
                Logout {user?.username && `(${user.username})`}
              </button>
            ) : (
              <Link
                to="/login"
                className="block w-full px-5 py-3 rounded-lg font-semibold transition-all shadow-md text-center hover:scale-105"
                style={{
                  backgroundColor: "var(--color-accent-secondary-DEFAULT)",
                  color: "var(--color-base-dark-900)",
                }}
                onClick={closeMenu}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeMenu}
        />
      )}
    </nav>
  );
};

export default Navbar;