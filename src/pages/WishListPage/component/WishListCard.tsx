import { Link } from 'react-router-dom'
import type { ProductType } from '../../../type/product'
import { FaRegTrashAlt } from "react-icons/fa";

type WishListCardProps = {
  item: ProductType
  onRemove: (productId: string) => void
  isRemoving?: boolean
  priceLabel: string
}

export default function WishListCard({
  item,
  onRemove,
  isRemoving = false,
  priceLabel,
}: WishListCardProps) {
  return (
    <article className="space-y-3">
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
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow"
          onClick={() => {
            if (!item._id) {
              return
            }
            onRemove(item._id)
          }}
          disabled={!item._id || isRemoving}
          aria-label="Remove"
        >
          <FaRegTrashAlt/>
        </button>
      </div>
      <div className="space-y-1">
        <p className="text-xs text-slate-400">
          {item.categorySub ?? item.categoryMain ?? '-'}
        </p>
        <h3 className="text-sm font-semibold text-slate-900">{item.name}</h3>
        <p className="text-sm font-semibold text-slate-900">₩ {priceLabel}</p>
      </div>
    </article>
  )
}
