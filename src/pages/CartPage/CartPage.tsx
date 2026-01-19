import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useGetCartItems from '../../hooks/cart/useGetCartItems'
import useCreateOrder from '../../hooks/order/useCreateOrder'
import useClearCart from '../../hooks/cart/useClearCart'
import { useAuth } from '../../context/AuthContext'
import CartCard from './component/CartCard'

export default function CartPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)
  const { data: cartData, isLoading, isError } = useGetCartItems({
    userId: user?._id,
  })
  const clearCart = useClearCart()
  const createOrder = useCreateOrder({
    onSuccess: () => {
      clearCart.mutate()
      setIsOrderModalOpen(true)
    },
  })
  const cartItems = cartData?.data ?? []
  console.log('장바구니 데이터', cartItems)
  
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-semibold">장바구니</h1>
          <p className="mt-2 text-sm text-slate-500">
            담긴 상품 {cartItems.length}개
          </p>
        </div>
        <button
        
          type="button"
          className="h-11 rounded-full bg-slate-900 px-6 text-sm font-semibold text-white"
          onClick={() => {
            createOrder.mutate({ shipTo: 'Seoul, KR' })
          }}
          disabled={createOrder.isPending || cartItems.length === 0}
        >
          {createOrder.isPending ? '주문 중...' : '주문하기'}
        </button>
      </div>
      {createOrder.isError && (
        <p className="mt-4 text-sm text-rose-500">
          주문 처리에 실패했습니다.
        </p>
      )}

      {isLoading && (
        <p className="mt-8 text-sm text-slate-500">
          장바구니를 불러오는 중입니다...
        </p>
      )}
      {isError && (
        <p className="mt-8 text-sm text-rose-500">
          장바구니를 불러오지 못했습니다.
        </p>
      )}
      {!isLoading && !isError && (
        <div className="mt-8 space-y-4">
          {cartItems.length === 0 && (
            <p className="text-sm text-slate-500">장바구니가 비어 있습니다.</p>
          )}
          {cartItems.map((item) => (
            <CartCard key={item._id} item={item} />
          ))}
        </div>
      )}
      {isOrderModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-slate-900">
              주문 성공하였습니다!
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              주문 내역에서 상세 정보를 확인할 수 있습니다.
            </p>
            <div className="mt-6 flex flex-col gap-2">
              <button
                type="button"
                className="h-11 rounded-full bg-slate-900 text-sm font-semibold text-white"
                onClick={() => setIsOrderModalOpen(false)}
              >
                확인
              </button>
              <button
                type="button"
                className="h-11 rounded-full border border-slate-200 text-sm font-semibold text-slate-700"
                onClick={() => {
                  setIsOrderModalOpen(false)
                  navigate('/order')
                }}
              >
                주문 내역 확인하기
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
