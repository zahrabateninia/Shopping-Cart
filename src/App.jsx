import { Routes, Route } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import Home from '@/pages/Home'
import Shop from '@/pages/Shop'
import Cart from '@/pages/Cart'
import Login from '@/pages/Login'

export default function App() {
  return (
    <>
      <Navbar />
      <main className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </>
  )
}
