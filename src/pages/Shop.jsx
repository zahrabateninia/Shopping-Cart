import { useQuery } from "@tanstack/react-query"
import ProductCard from "@/components/ProductCard"
import { useDispatch } from "react-redux"
import { addItem } from "@/features/cart/cartSlice"
import { fetchProducts } from "@/lib/api"

export default function Shop() {
  const { data = [], isPending, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  })

  const dispatch = useDispatch()
  const handleAddToCart = (product) => dispatch(addItem({ product, quantity: 1 }))

  if (isPending) return <p className="p-8 text-center">Loading products…</p>
  if (error) return <p className="p-8 text-center text-red-600">Error loading products</p>

  return (
    <section className="px-4 py-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
          {data.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </div>
    </section>
  )
}
