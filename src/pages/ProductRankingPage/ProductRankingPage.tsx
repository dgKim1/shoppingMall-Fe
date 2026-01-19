import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import useGetAllProducts from '../../hooks/product/useGetAllProducts'
import useAddToWishlist from '../../hooks/wishlist/useAddToWishlist'
import useGetWishlist from '../../hooks/wishlist/useGetWishlist'
import useRemoveFromWishlist from '../../hooks/wishlist/useRemoveFromWishlist'
import { useAuth } from '../../context/AuthContext'
import ProductRankingCard from './component/ProductRankingCard'

type ProductRankingPageProps = {
  title: string
  sort?: string
  personType?: string
  categoryMain?: string
  categorySub?: string
}

export default function ProductRankingPage({
  title,
  sort = '추천순',
  personType,
  categoryMain,
  categorySub,
}: ProductRankingPageProps) {
  const navigate = useNavigate()
  const { token } = useAuth()
  const { data: productsResponse, isLoading, isError } = useGetAllProducts({
    limit: 100,
    sort,
    personType,
    categoryMain,
    categorySub,
  })
  const { data: wishlistResponse } = useGetWishlist(Boolean(token))
  const addToWishlist = useAddToWishlist()
  const removeFromWishlist = useRemoveFromWishlist()
  const products = productsResponse?.pages.flatMap((page) => page.data) ?? []
  const rankedProducts = useMemo(() => products.slice(0, 100), [products])
  const formatPrice = (price: number) =>
    `${new Intl.NumberFormat('ko-KR').format(price)} 원`

  const wishlistKeySet = useMemo(() => {
    return new Set(
      (wishlistResponse?.data ?? [])
        .map((item) => item._id ?? item.sku)
        .filter((value): value is string => Boolean(value)),
    )
  }, [wishlistResponse?.data])

  const toggleFavorite = (productId: string, isFavorite: boolean) => {
    if (!token) {
      navigate('/login')
      return
    }
    if (isFavorite) {
      removeFromWishlist.mutate({ productId })
    } else {
      addToWishlist.mutate({ productId })
    }
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <header className="mb-10">
        <h1 className="text-3xl font-semibold text-slate-900">{title}</h1>
        <p className="mt-2 text-sm text-slate-500">
          인기 순위 1 - {rankedProducts.length}
        </p>
      </header>

      {isLoading && (
        <p className="text-sm text-slate-500">상품을 불러오는 중입니다...</p>
      )}
      {isError && (
        <p className="text-sm text-rose-500">상품을 불러오지 못했습니다.</p>
      )}
      {!isLoading && !isError && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {rankedProducts.map((product, index) => (
            <ProductRankingCard
              key={`${product.sku}-${index}`}
              product={product}
              rank={index + 1}
              isFavorite={wishlistKeySet.has(product._id ?? product.sku)}
              priceLabel={formatPrice(product.price)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </section>
  )
}
