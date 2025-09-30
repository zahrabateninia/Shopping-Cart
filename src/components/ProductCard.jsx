import React from "react"

export default function ProductCard({ product, onAddToCart }) {
  const imageSrc = product?.image || null

  const formatPrice = (value) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(Number(value || 0))

  return (
    <article className="max-w-xs w-full bg-white rounded-xl  border-gray-700 shadow-sm  transition-transform transform hover:-translate-y-1 overflow-hidden">
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
        <h3 className="text font-semibold text-gray-900 leading-tight line-clamp-2">
          {product.title}
        </h3>

        <p className="text-sm font-thin  line-clamp-2" aria-hidden>
          {product.description ? product.description.slice(0, 40) + (product.description.length > 40 ? "…" : "") : ""}
        </p>

        <div className="mt-auto flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-gray-900">{formatPrice(product.price)}</span>
            {product.category?.name && (
              <span className="text-xs text-gray-500">{product.category.name}</span>
            )}
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className="ml-2 inline-flex items-center justify-center rounded-lg px-3 py-2 text-black text-sm font-medium border-2 "
            aria-label={`Add ${product.title} to cart`}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </article>
  )
}
