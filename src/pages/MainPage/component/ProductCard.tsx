import { Link } from 'react-router-dom'
import type { ProductInput } from '../../../type/product'

type ProductCardProps = {
  product: ProductInput
  index: number
  priceLabel: string
}

export default function ProductCard({
  product,
  index,
  priceLabel,
}: ProductCardProps) {
  return (
    <Link to={`/product/${product.sku}`} className="block">
      <article className={`fade-up delay-${(index + 1) * 120} space-y-3`}>
      {product.image?.[0] ? (
        <img
          src={product.image[0]}
          alt={product.name}
          className="aspect-square w-full bg-slate-100 object-cover"
          loading="lazy"
        />
      ) : (
        <div className="aspect-square w-full bg-slate-100" />
      )}
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-[0.2em] text-rose-500">
            {product.status}
          </p>
          <h3 className="text-sm font-semibold text-slate-900">
            {product.name}
          </h3>
          <p className="text-xs text-slate-500">
            {product.category?.[0] ?? product.description}
          </p>
          <p className="text-sm font-semibold text-slate-900">{priceLabel}</p>
        </div>
      </article>
    </Link>
  )
}
