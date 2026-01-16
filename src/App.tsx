import type { ReactNode } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import MainPage from './pages/MainPage/MainPage'
import CartPage from './pages/CartPage/CartPage'
import OrderPage from './pages/OrderPage/OrderPage'
import ProductDetailPage from './pages/ProductDetailPage/ProductDetailPage'

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">{children}</main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <MainPage />
            </Layout>
          }
        />
        <Route
          path="/product/:sku"
          element={
            <Layout>
              <ProductDetailPage />
            </Layout>
          }
        />
        <Route
          path="/cart"
          element={
            <Layout>
              <CartPage />
            </Layout>
          }
        />
        <Route
          path="/order"
          element={
            <Layout>
              <OrderPage />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
