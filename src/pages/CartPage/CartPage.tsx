import useGetCartItems from '../../hooks/cart/useGetCartItems'
import { useAuth } from '../../context/AuthContext'
import type { ProductInput } from '../../type/product'

export default function CartPage() {
  const { user } = useAuth()
  const { data: cartResponse, isLoading, isError } = useGetCartItems({
    userId: user?._id ?? undefined,
  })
  const items = cartResponse?.data ?? []
  const getProductLabel = (productId: string | ProductInput) => {
    if (typeof productId === 'string') {
      return productId
    }
    return productId.name ?? productId._id ?? '알 수 없는 상품'
  }

  const getProductImage = (productId: string | ProductInput) => {
    if (typeof productId === 'string') {
      return null
    }
    return productId.image?.[0] ?? null
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Cart</h1>
          <p className="mt-2 text-sm text-slate-500">
            담긴 상품 {items.length}개
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
          {items.length === 0 && (
            <p className="text-sm text-slate-500">장바구니가 비어 있습니다.</p>
          )}
          {items.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-4"
            >
              <div className="flex items-center gap-4">
                {getProductImage(item.productId) ? (
                  <img
                    src={getProductImage(item.productId) as string}
                    alt={getProductLabel(item.productId)}
                    className="h-16 w-16 rounded-lg object-cover"
                  />
                ) : (
                  <div className="h-16 w-16 rounded-lg bg-slate-100" />
                )}
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {getProductLabel(item.productId)}
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
