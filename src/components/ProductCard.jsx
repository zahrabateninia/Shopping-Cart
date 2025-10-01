import React from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  addItem,
  increaseQuantity,
  decreaseQuantity,
  selectCartItemsArray,
} from "@/features/cart/cartSlice"

export default function ProductCard({ product }) {
  const dispatch = useDispatch()
  const cartItems = useSelector(selectCartItemsArray)
  const cartItem = cartItems.find((item) => item.id === String(product.id))

  const formatPrice = (value) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(Number(value || 0))

  const handleAddToCart = () => {
    dispatch(addItem({ product, quantity: 1 }))
  }

  const handleIncrease = () => {
    dispatch(increaseQuantity(product.id))
  }

  const handleDecrease = () => {
    dispatch(decreaseQuantity(product.id))
  }

  const imageSrc = product?.image || null

  return (
<article className="w-[260px] sm:w-[300px] md:w-[320px] lg:w-[340px] h-[350px] bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden flex flex-col transition-transform transform hover:-translate-y-1 hover:shadow-lg">
  <div className="relative flex-shrink-0 h-48 bg-gray-50 flex items-center justify-center p-4">
    {imageSrc ? (
      <img
        src={imageSrc}
        alt={product.title || "Product image"}
        loading="lazy"
        className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105"
      />
    ) : (
      <div className="w-full h-full flex items-center justify-center text-gray-400">
        No image
      </div>
    )}
  </div>

  <div className="flex flex-col p-6 flex-1">
    <h3 className="font-semibold mt-4 text-gray-900 leading-tight line-clamp-2">
      {product.title}
    </h3>

    <div className="mt-auto flex items-center justify-between ">
      <div className="flex flex-col">
        <span className="text-lg font-bold text-gray-900">
          {formatPrice(product.price)}
        </span>
      </div>

      {!cartItem ? (
        <button
          onClick={handleAddToCart}
          className="ml-2 inline-flex items-center justify-center rounded-lg px-3 py-2 text-black text-sm font-medium border-2 border-gray-300 hover:bg-gray-100 transition-colors"
        >
          Add To Cart
        </button>
      ) : (
        <div className="flex items-center gap-2">
          <button
            onClick={handleDecrease}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-300 text-lg font-bold hover:bg-gray-100 transition-colors"
          >
            −
          </button>
          <span className="text-sm font-semibold">{cartItem.quantity}</span>
          <button
            onClick={handleIncrease}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-300 text-lg font-bold hover:bg-gray-100 transition-colors"
          >
            +
          </button>
        </div>
      )}
    </div>
  </div>
</article>

  )
}
