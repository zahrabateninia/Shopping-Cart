import { useState } from "react"
import { useDispatch } from "react-redux"
import { login } from "@/features/auth/authSlice"
import { useNavigate, useLocation } from "react-router-dom"

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  // Redirect back to previous page after login
  const from = location.state?.from?.pathname || "/"

  const handleSubmit = (e) => {
    e.preventDefault()
    // demo for now
    dispatch(login({ username }))
    navigate(from, { replace: true })
  }

  return (
    <div className="flex items-center justify-center h-full bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-pink p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        <label className="block mb-4">
          <span className="text-gray-700">Username</span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </label>

        <label className="block mb-6">
          <span className="text-gray-700">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </label>

        <button
          type="submit"
          className="w-full bg-amber-700 text-black py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  )
}
