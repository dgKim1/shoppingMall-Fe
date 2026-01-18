import { useMemo, useState } from 'react'
import useGetAllProducts from '../../hooks/product/useGetAllProducts'
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
  const { data: productsResponse, isLoading, isError } = useGetAllProducts({
    limit: 100,
    sort,
    personType,
    categoryMain,
    categorySub,
  })
  const products = productsResponse?.pages.flatMap((page) => page.data) ?? []
  const rankedProducts = useMemo(() => products.slice(0, 100), [products])
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const formatPrice = (price: number) =>
    `${new Intl.NumberFormat('ko-KR').format(price)} 원`

  const toggleFavorite = (sku: string) => {
    setFavorites((prev) => {
      const next = new Set(prev)
      if (next.has(sku)) {
        next.delete(sku)
      } else {
        next.add(sku)
      }
      return next
    })
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
              isFavorite={favorites.has(product.sku)}
              priceLabel={formatPrice(product.price)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </section>
  )
}
