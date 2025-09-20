import { Routes, Route } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import Home from '@/pages/Home'
import Shop from '@/pages/Shop'
import Cart from '@/pages/Cart'
import Login from '@/pages/Login'



export default function App() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <main className="flex-1 overflow-auto pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </div>
  )
}
