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
    <article className="max-w-xs w-full bg-white rounded-xl border-gray-200 shadow-sm transition-transform transform hover:-translate-y-1 overflow-hidden">
      <div className="relative h-52 bg-gray-100 m-4">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={product.title || "Product image"}
            loading="lazy"
            className="absolute w-full h-full object-cover rounded-xl"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No image
          </div>
        )}
      </div>

      <div className="flex flex-col p-4 gap-2 min-h-[140px]">
        <h3 className="font-semibold text-gray-900 leading-tight line-clamp-2">
          {product.title}
        </h3>
{/* 
        <p className="text-sm font-thin line-clamp-2" aria-hidden>
          {product.description
            ? product.description.slice(0, 40) +
              (product.description.length > 40 ? "…" : "")
            : ""}
        </p> */}

        <div className="mt-auto flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
            {product.category?.name && (
              <span className="text-xs text-gray-500">
                {product.category.name}
              </span>
            )}
          </div>

          {!cartItem ? (
            <button
              onClick={handleAddToCart}
              className="ml-2 inline-flex items-center justify-center rounded-lg px-3 py-2 text-black text-sm font-medium border-2 hover:bg-gray-200"
              aria-label={`Add ${product.title} to cart`}
            >
              Add To Cart
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={handleDecrease}
                className="w-8 h-8 flex items-center justify-center rounded-lg border text-lg font-bold hover:bg-gray-200"
              >
                −
              </button>
              <span className="text-sm font-semibold">{cartItem.quantity}</span>
              <button
                onClick={handleIncrease}
                className="w-8 h-8 flex items-center justify-center rounded-lg border text-lg font-bold hover:bg-gray-200"
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
