import { useAuth } from '../../context/AuthContext'
import useGetWishlist from '../../hooks/wishlist/useGetWishlist'
import useRemoveFromWishlist from '../../hooks/wishlist/useRemoveFromWishlist'
import WishListCard from './component/WishListCard'

export default function WishListPage() {
  const { token } = useAuth()
  const { data, isLoading, isError } = useGetWishlist(Boolean(token))
  const removeFromWishlist = useRemoveFromWishlist()
  const items = data?.data ?? []
  const formatPrice = (price: number) =>
    `${new Intl.NumberFormat('ko-KR').format(price)}`

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
            <WishListCard
              key={item._id ?? item.sku}
              item={item}
              priceLabel={formatPrice(item.price)}
              isRemoving={removeFromWishlist.isPending}
              onRemove={(productId) => {
                removeFromWishlist.mutate({ productId })
              }}
            />
          ))}
        </div>
      )}
    </section>
  )
}
