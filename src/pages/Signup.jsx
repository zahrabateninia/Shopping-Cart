import { useState } from "react"
import { useDispatch } from "react-redux"
import { signup } from "@/features/auth/authSlice"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { motion, AnimatePresence } from "framer-motion"

export default function Signup() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      dispatch(signup({ username, email, password }))
      toast.success("Account created successfully!")
      navigate("/") // redirect to home or desired page
    } catch (err) {
      setError(err.message)
      toast.error("Sign up failed.")
    }
  }

  return (
    <div
      className="
        flex items-center justify-center min-h-screen
        bg-[var(--color-base-dark-900)]
        text-[var(--color-base-dark-300)]
        px-4
      "
    >
      <AnimatePresence mode="wait">
        <motion.form
          key="signup-form"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.97 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          onSubmit={handleSubmit}
          className="
            bg-[var(--color-base-dark-800)]
            border border-[var(--color-base-dark-700)]
            rounded-2xl shadow-2xl p-8 w-full max-w-md
            text-[var(--color-base-dark-300)]
            backdrop-blur-md
          "
        >
          <h1
            className="
              text-3xl font-extrabold mb-6 text-center
              bg-gradient-to-r from-[var(--color-accent-primary-light)] to-[var(--color-accent-secondary-dark)]
              bg-clip-text text-transparent tracking-tight
            "
          >
            Create Account
          </h1>

          {error && (
            <p className="mb-4 text-[var(--color-accent-secondary-dark)] text-center">
              {error}
            </p>
          )}

          {/* Username Field */}
          <label className="block mb-4">
            <span className="text-[var(--color-base-dark-300)] font-medium">
              Username
            </span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="
                mt-1 w-full px-3 py-2 rounded-lg
                bg-[var(--color-base-dark-900)]
                border border-[var(--color-base-dark-700)]
                text-[var(--color-base-dark-300)]
                focus:outline-none focus:ring-2
                focus:ring-[var(--color-accent-primary-light)]
                transition-all
              "
              required
            />
          </label>

          {/* Email Field */}
          <label className="block mb-4">
            <span className="text-[var(--color-base-dark-300)] font-medium">
              Email
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                mt-1 w-full px-3 py-2 rounded-lg
                bg-[var(--color-base-dark-900)]
                border border-[var(--color-base-dark-700)]
                text-[var(--color-base-dark-300)]
                focus:outline-none focus:ring-2
                focus:ring-[var(--color-accent-primary-light)]
                transition-all
              "
              required
            />
          </label>

          {/* Password Field */}
          <label className="block mb-6">
            <span className="text-[var(--color-base-dark-300)] font-medium">
              Password
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
                mt-1 w-full px-3 py-2 rounded-lg
                bg-[var(--color-base-dark-900)]
                border border-[var(--color-base-dark-700)]
                text-[var(--color-base-dark-300)]
                focus:outline-none focus:ring-2
                focus:ring-[var(--color-accent-primary-light)]
                transition-all
              "
              required
            />
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            className="
              w-full py-3 rounded-lg font-semibold
              bg-[var(--color-accent-primary-dark)]
              text-[var(--color-base-dark-900)]
              hover:bg-[var(--color-accent-primary-light)]
              transition-all shadow-md
            "
          >
            Sign Up
          </button>

          <p className="mt-4 text-center text-sm text-[var(--color-base-dark-400)]">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="
                text-[var(--color-accent-primary-300)]
                hover:text-[var(--color-accent-primary-light)]
                transition-colors font-medium
              "
            >
              Login
            </button>
          </p>
        </motion.form>
      </AnimatePresence>
    </div>
  )
}
