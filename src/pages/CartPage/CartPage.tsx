import useGetCartItems from '../../hooks/cart/useGetCartItems'
import useCreateOrder from '../../hooks/order/useCreateOrder'
import { useAuth } from '../../context/AuthContext'

import CartCard from './component/CartCard'

export default function CartPage() {
  const { user } = useAuth()
  const { data: cartData, isLoading, isError } = useGetCartItems({
    userId: user?._id,
  })
  const createOrder = useCreateOrder()
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
    </section>
  )
}
