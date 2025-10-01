import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { selectCartTotalQuantity } from "@/features/cart/cartSlice"
import { performLogout } from "@/features/auth/authSlice"
import React from "react"
import toast from "react-hot-toast"
import { FaShoppingCart } from "react-icons/fa"

const Navbar = () => {
  const totalItems = useSelector(selectCartTotalQuantity)
  const { isLoggedIn, user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(performLogout())
    navigate("/") // redirect to home after logout
    toast.success("You are logout!")
  }

  return (
    <nav
      className="
        fixed top-0 left-0 z-50 w-full
        flex justify-between items-center
        px-6 py-3
        bg-white/70 backdrop-blur-md shadow-lg
      "
    >
      <Link to="/" className="text-2xl font-extrabold tracking-wide text-gray-900 hover:text-indigo-600 transition-colors">
        🛒 ShopEase
      </Link>

      <div className="flex gap-8 items-center text-gray-700 font-medium">
        <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
        <Link to="/shop" className="hover:text-indigo-600 transition-colors">Shop</Link>

        {/* Cart Icon with badge */}
        <Link to="/cart" className="relative flex items-center hover:text-indigo-600 transition-colors">
          <FaShoppingCart size={22} />
          {totalItems > 0 && (
            <span
              className="
                absolute -top-2 -right-2
                bg-red-600 text-white text-xs font-bold
                rounded-full w-5 h-5 flex items-center justify-center
                shadow-md
              "
            >
              {totalItems}
            </span>
          )}
        </Link>
      </div>

      {isLoggedIn ? (
        <button
          onClick={handleLogout}
          className="
            px-4 py-2 rounded-lg
            bg-indigo-600 text-white font-semibold
            hover:bg-indigo-700 transition-all
            shadow-md
          "
        >
          Logout {user?.username && `(${user.username})`}
        </button>
      ) : (
        <Link
          to="/login"
          className="
            px-4 py-2 rounded-lg
            bg-amber-500 text-white font-semibold
            hover:bg-amber-600 transition-all
            shadow-md
          "
        >
          Login
        </Link>
      )}
    </nav>
  )
}

export default Navbar
