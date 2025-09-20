import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCartTotalQuantity } from '@/features/cart/cartSlice'
import React from 'react'


const Navbar = () => {
  const totalItems = useSelector(selectCartTotalQuantity)

  return (
    <nav
      className="
        fixed top-0 left-0 z-50 w-full
        flex justify-between items-center
        p-4 bg-gray-400 text-black shadow
      "
    >
      <h1>logo</h1>
      <div className="flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/cart">Cart ({totalItems})</Link>
      </div>
      <Link to="/login">Login</Link>
    </nav>
  )
}

export default Navbar
