import { useQuery } from "@tanstack/react-query"
import ProductCard from "@/components/ProductCard"
import { useDispatch } from "react-redux"
import { addItem } from "@/features/cart/cartSlice"
import { fetchProducts } from "@/lib/api"
import ProductCardSkeleton from "@/components/ProductCardSkeleton"
import { motion } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function Shop() {
  const { data = [], isPending, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  })

  const dispatch = useDispatch()
  const handleAddToCart = (product) => dispatch(addItem({ product, quantity: 1 }))

  if (isPending) {
    return (
      <motion.div
        className="flex flex-wrap gap-5 items-center justify-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        layout
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </motion.div>
    )
  }

  if (error) return <p className="p-8 text-center text-red-600">Error loading products</p>

  return (
    <section className="px-4 py-6">
      <motion.div variants={containerVariants} initial="hidden" animate="visible" layout>
        <motion.div
          className="flex flex-wrap gap-5 items-center justify-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          layout
        >
          {data.map((product) => (
            <motion.div key={product.id} variants={cardVariants} layout>
              <ProductCard product={product} onAddToCart={handleAddToCart} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
