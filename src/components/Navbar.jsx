import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { selectCartTotalQuantity } from "@/features/cart/cartSlice"
import { logout } from "@/features/auth/authSlice"
import React from "react"

const Navbar = () => {
  const totalItems = useSelector(selectCartTotalQuantity)
  const { isLoggedIn, user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate("/") // redirect to home after logout
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

      <div className="flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/cart">Cart ({totalItems})</Link>
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
