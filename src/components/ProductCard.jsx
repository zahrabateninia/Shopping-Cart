import React from "react"

export default function ProductCard({ product, onAddToCart }) {
  const imageSrc = product?.images?.[0] || product?.image || null

  const formatPrice = (value) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(Number(value || 0))

  return (
    <article className="max-w-xs w-full bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-transform transform hover:-translate-y-1 overflow-hidden">
      <div className="w-full h-52 bg-gray-100 overflow-hidden">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={product.title || "Product image"}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No image
          </div>
        )}
      </div>

      <div className="flex flex-col p-4 gap-2 min-h-[140px]">
        <h3 className="text-sm font-semibold text-gray-900 leading-tight line-clamp-2">
          {product.title}
        </h3>

        <p className="text-sm text-gray-500 line-clamp-2" aria-hidden>
          {product.description ? product.description.slice(0, 80) + (product.description.length > 80 ? "…" : "") : ""}
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
            className="ml-2 inline-flex items-center justify-center rounded-lg px-3 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-black text-sm font-medium shadow-md hover:brightness-95 active:scale-95 transition"
            aria-label={`Add ${product.title} to cart`}
          >
            Add
          </button>
        </div>
      </div>
    </article>
  )
}
