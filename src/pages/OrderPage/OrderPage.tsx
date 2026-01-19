import { useMemo } from 'react'
import useGetOrderHistory from '../../hooks/order/useGetOrderHistory'
import { useAuth } from '../../context/AuthContext'

export default function OrderPage() {
  const { token } = useAuth()
  const { data, isLoading, isError } = useGetOrderHistory({
    enabled: Boolean(token),
  })
  const orders = useMemo(() => data?.data ?? [], [data?.data])
  const formatPrice = (price: number) =>
    `${new Intl.NumberFormat('ko-KR').format(price)} 원`
  const formatDate = (value: string) =>
    new Date(value).toLocaleDateString('ko-KR')

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-semibold text-slate-900">Order</h1>
      <p className="mt-3 text-slate-600">주문 내역을 확인하세요.</p>

      {!token && (
        <p className="mt-8 text-sm text-slate-500">
          주문 내역은 로그인 후 확인할 수 있습니다.
        </p>
      )}

      {token && isLoading && (
        <p className="mt-8 text-sm text-slate-500">
          주문 내역을 불러오는 중입니다...
        </p>
      )}
      {token && isError && (
        <p className="mt-8 text-sm text-rose-500">
          주문 내역을 불러오지 못했습니다.
        </p>
      )}
      {token && !isLoading && !isError && orders.length === 0 && (
        <p className="mt-8 text-sm text-slate-500">
          주문 내역이 없습니다.
        </p>
      )}

      {token && !isLoading && !isError && orders.length > 0 && (
        <div className="mt-8 space-y-6">
          {orders.map((order) => (
            <article
              key={order._id}
              className="rounded-2xl border border-slate-200 p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Order
                  </p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">
                    {order.orderId}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    {formatDate(order.createdAt)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-500">Status</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {order.status}
                  </p>
                  <p className="mt-3 text-sm text-slate-500">Total</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {formatPrice(order.totalPrice)}
                  </p>
                </div>
              </div>

              <div className="mt-4 text-sm text-slate-600">
                배송지: {order.shipTo}
              </div>

              <div className="mt-5 space-y-3">
                {order.items.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-start justify-between gap-4 border-t border-slate-100 pt-4"
                  >
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {item.productName}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        사이즈 {item.size} · 색상 {item.color ?? '-'} · 수량{' '}
                        {item.quantity}
                      </p>
                    </div>
                    <div className="text-sm font-semibold text-slate-900">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
