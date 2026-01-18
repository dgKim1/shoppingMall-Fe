import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import useGetWishlist from '../../hooks/wishlist/useGetWishlist'
import useRemoveFromWishlist from '../../hooks/wishlist/useRemoveFromWishlist'

export default function WishListPage() {
  const { token } = useAuth()
  const { data, isLoading, isError } = useGetWishlist(Boolean(token))
  const removeFromWishlist = useRemoveFromWishlist()
  const items = data?.data ?? []
  const formatPrice = (price: number) =>
    `${new Intl.NumberFormat('ko-KR').format(price)} ??`

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <header className="mb-10">
        <h1 className="text-3xl font-semibold text-slate-900">Wishlist</h1>
        <p className="mt-2 text-sm text-slate-500">
          {items.length} items saved
        </p>
      </header>

      {!token && (
        <p className="text-sm text-slate-500">
          Login is required to view your wishlist.
        </p>
      )}

      {token && isLoading && (
        <p className="text-sm text-slate-500">Loading wishlist...</p>
      )}
      {token && isError && (
        <p className="text-sm text-rose-500">
          Failed to load wishlist items.
        </p>
      )}
      {token && !isLoading && !isError && items.length === 0 && (
        <p className="text-sm text-slate-500">Wishlist is empty.</p>
      )}
      {token && !isLoading && !isError && items.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <article key={item._id ?? item.sku} className="space-y-3">
              <div className="relative overflow-hidden rounded-2xl bg-slate-100">
                <Link to={`/product/${item.sku}`}>
                  {item.image?.[0] ? (
                    <img
                      src={item.image[0]}
                      alt={item.name}
                      className="aspect-[3/4] w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="aspect-[3/4] w-full bg-slate-200" />
                  )}
                </Link>
                <button
                  type="button"
                  className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 shadow"
                  onClick={() => {
                    if (!item._id) {
                      return
                    }
                    removeFromWishlist.mutate({ productId: item._id })
                  }}
                  disabled={!item._id || removeFromWishlist.isPending}
                >
                  Remove
                </button>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-slate-400">
                  {item.categorySub ?? item.categoryMain ?? '-'}
                </p>
                <h3 className="text-sm font-semibold text-slate-900">
                  {item.name}
                </h3>
                <p className="text-sm font-semibold text-slate-900">
                  {formatPrice(item.price)}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
