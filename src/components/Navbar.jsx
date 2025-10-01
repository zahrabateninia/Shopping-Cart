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
        p-4 bg-gray-400 text-black shadow
      "
    >
      <h1 className="font-bold">Logo</h1>

      <div className="flex gap-6 items-center">
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>

        {/* Cart Icon with badge */}
        <Link to="/cart" className="relative flex items-center">
          <FaShoppingCart size={22} />
          {totalItems > 0 && (
            <span
              className="
                absolute -top-2 -right-2
                bg-red-600 text-white text-xs font-bold
                rounded-full w-4 h-4 flex items-center justify-center
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
          className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-indigo-700"
        >
          Logout {user?.username && `(${user.username})`}
        </button>
      ) : (
        <Link
          to="/login"
          className="px-3 py-1 rounded bg-amber-700 text-black hover:bg-indigo-700"
        >
          Login
        </Link>
      )}
    </nav>
  )
}

export default Navbar
