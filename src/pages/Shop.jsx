import { useQuery } from '@tanstack/react-query'
import { fetchProducts } from '@/lib/api'

export default function Shop() {
  const { data, isPending, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  })

  if (isPending) return <p>Loading products...</p>
  if (error) return <p>Something went wrong: {error.message}</p>

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {data.map((product) => (
        <div key={product.id} className="border rounded-lg p-4 shadow">
          <img
            src={product.images?.[0]}
            alt={product.title}
            className="h-40 w-full object-cover rounded"
          />
          <h2 className="mt-2 font-semibold">{product.title}</h2>
          <p className="text-gray-600">${product.price}</p>
          <button className="mt-2 w-full bg-blue-600 text-white py-1 rounded">
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  )
}
