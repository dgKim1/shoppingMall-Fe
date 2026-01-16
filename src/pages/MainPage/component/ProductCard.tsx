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
    <article className={`fade-up delay-${(index + 1) * 120} space-y-3`}>
      {product.image ? (
        <img
          src={product.image}
          alt={product.name}
          className="h-[508px] w-[508px] bg-slate-100 object-cover"
          loading="lazy"
        />
      ) : (
        <div className="h-[508px] w-[508px] bg-slate-100" />
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
  )
}
