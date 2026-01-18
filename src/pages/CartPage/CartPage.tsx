import useGetCartItems from '../../hooks/cart/useGetCartItems'
import { useAuth } from '../../context/AuthContext'
import type { ProductInput } from '../../type/product'

export default function CartPage() {
  const { user } = useAuth()
  const { data: cartResponse, isLoading, isError } = useGetCartItems({
    userId: user?._id,
  })
  const cartItems = cartResponse?.data ?? []
  const getProductLabel = (product?: ProductInput) =>
    product?.name ?? product?._id ?? '알 수 없는 상품'

  const getProductImage = (product?: ProductInput) =>
    product?.image?.[0] ?? null

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Cart</h1>
          <p className="mt-2 text-sm text-slate-500">
            담긴 상품 {cartItems.length}개
          </p>
        </div>
        <button
          type="button"
          className="h-11 rounded-full bg-slate-900 px-6 text-sm font-semibold text-white"
        >
          주문하기
        </button>
      </div>

      {isLoading && (
        <p className="mt-8 text-sm text-slate-500">장바구니를 불러오는 중입니다...</p>
      )}
      {isError && (
        <p className="mt-8 text-sm text-rose-500">장바구니를 불러오지 못했습니다.</p>
      )}
      {!isLoading && !isError && (
        <div className="mt-8 space-y-4">
          {cartItems.length === 0 && (
            <p className="text-sm text-slate-500">장바구니가 비어 있습니다.</p>
          )}
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-4"
            >
              <div className="flex items-center gap-4">
                {getProductImage(item.product) ? (
                  <img
                    src={getProductImage(item.product) as string}
                    alt={getProductLabel(item.product)}
                    className="h-16 w-16 rounded-lg object-cover"
                  />
                ) : (
                  <div className="h-16 w-16 rounded-lg bg-slate-100" />
                )}
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {getProductLabel(item.product)}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    사이즈 {item.size} · 색상 {item.color ?? '-'} · 수량{' '}
                    {item.quantity}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
