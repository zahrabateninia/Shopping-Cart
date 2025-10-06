import { useQuery } from "@tanstack/react-query";
import ProductCard from "@/components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "@/features/cart/cartSlice";
import { selectIsLoggedIn } from "@/features/auth/authSlice";
import { fetchProducts } from "@/lib/api";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Shop() {
  const { data = [], isPending, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    if (!isLoggedIn) {
      navigate("/login", { state: { from: { pathname: "/shop" } } });
      return;
    }
    dispatch(addItem({ product, quantity: 1 }));
  };

  if (isPending) {
    return (
      <motion.div
        className="min-h-screen flex flex-wrap gap-5 items-center justify-center"
        style={{
          backgroundColor: "var(--color-base-dark-900)",
          paddingTop: "calc(64px + 2rem)", // prevent overlap with navbar
        }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        layout
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </motion.div>
    );
  }

  if (error)
    return (
      <p
        className="p-8 text-center font-semibold"
        style={{ color: "var(--color-accent-secondary-DEFAULT)" }}
      >
        Error loading products
      </p>
    );

  return (
    <section
      className="min-h-screen px-6 pb-12"
      style={{
        backgroundColor: "var(--color-base-dark-900)",
        paddingTop: "calc(64px + 2rem)", // offset for fixed navbar
        color: "var(--color-base-dark-300)",
      }}
    >
      <div className="text-center mb-12">
        <h1
          className="text-5xl font-extrabold tracking-tight mb-3 bg-clip-text text-transparent"
          style={{
            backgroundImage: "var(--gradient-brand)",
          }}
        >
          Discover Our Collection
        </h1>
        <p
          className="text-lg max-w-2xl mx-auto"
          style={{ color: "var(--color-base-dark-400)" }}
        >
          Explore a great selection of products chosen for quality,
          craftsmanship, and modern style.
        </p>
      </div>

      {/* Product Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        layout
        className="flex flex-wrap gap-6 justify-center"
      >
        {data.map((product) => (
          <motion.div key={product.id} variants={cardVariants} layout>
            <ProductCard product={product} onAddToCart={handleAddToCart} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
