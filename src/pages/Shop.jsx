import { useQuery } from "@tanstack/react-query"
import ProductCard from "@/components/ProductCard"
import { useDispatch } from "react-redux"
import { addItem } from "@/features/cart/cartSlice"
import { fetchProducts } from "@/lib/api"
import ProductCardSkeleton from "@/components/ProductCardSkeleton"

export default function Shop() {
  const { data = [], isPending, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  })

  const dispatch = useDispatch()
  const handleAddToCart = (product) => dispatch(addItem({ product, quantity: 1 }))

  if (isPending) {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}
  if (error) return <p className="p-8 text-center text-red-600">Error loading products</p>

  return (
    <section className="px-4 py-6">
      <div>
        <div className="flex flex-wrap gap-5  items-center justify-center">
          {data.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </div>
    </section>
  )
}
