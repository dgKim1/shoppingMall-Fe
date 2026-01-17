import { useMemo, useState } from 'react'
import useGetAllProducts from '../../hooks/product/useGetAllProducts'

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
            <article key={`${product.sku}-${index}`} className="space-y-3">
              <div className="relative overflow-hidden rounded-2xl bg-slate-100">
                {product.image?.[0] ? (
                  <img
                    src={product.image[0]}
                    alt={product.name}
                    className="aspect-[3/4] w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="aspect-[3/4] w-full bg-slate-200" />
                )}
                <span className="absolute left-2 top-2 rounded bg-black/90 px-2 py-1 text-xs font-semibold text-white">
                  {index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => toggleFavorite(product.sku)}
                  className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow"
                  aria-pressed={favorites.has(product.sku)}
                  aria-label="찜"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill={favorites.has(product.sku) ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    strokeWidth="1.6"
                  >
                    <path d="M12 20s-6-4.3-8.5-7.6C1.6 10.3 2.1 7.5 4 6a4.5 4.5 0 0 1 6 1.1L12 9l2-1.9A4.5 4.5 0 0 1 20 6c1.9 1.5 2.4 4.3.5 6.4C18 15.7 12 20 12 20z" />
                  </svg>
                </button>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-slate-400">
                  {product.categorySub ?? product.categoryMain ?? '-'}
                </p>
                <h3 className="text-sm font-semibold text-slate-900">
                  {product.name}
                </h3>
                <p className="text-sm font-semibold text-slate-900">
                  {formatPrice(product.price)}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
