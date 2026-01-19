import { Link } from 'react-router-dom'
import type { ProductType } from '../../../type/product'

type ProductRankingCardProps = {
  product: ProductType
  rank: number
  isFavorite: boolean
  priceLabel: string
  onToggleFavorite: (sku: string) => void
}

export default function ProductRankingCard({
  product,
  rank,
  isFavorite,
  priceLabel,
  onToggleFavorite,
}: ProductRankingCardProps) {
  return (
    <article className="space-y-3">
      <div className="relative overflow-hidden rounded-2xl bg-slate-100">
        <Link to={`/product/${product.sku}`} className="block">
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
        </Link>
        <span className="absolute left-2 top-2 rounded bg-black/90 px-2 py-1 text-xs font-semibold text-white">
          {rank}
        </span>
        <button
          type="button"
          onClick={() => onToggleFavorite(product.sku)}
          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow"
          aria-pressed={isFavorite}
          aria-label="찜"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill={isFavorite ? 'currentColor' : 'none'}
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
          <Link to={`/product/${product.sku}`} className="hover:underline">
            {product.name}
          </Link>
        </h3>
        <p className="text-sm font-semibold text-slate-900">{priceLabel}</p>
      </div>
    </article>
  )
}
