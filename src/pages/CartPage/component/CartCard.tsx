import { FaRegTrashAlt } from 'react-icons/fa'
import type { ProductType } from '../../../type/product'
import useRemoveCartItemById from '../../../hooks/cart/useRemoveCartItemById'
import useUpdateCartItemQuantity from '../../../hooks/cart/useUpdateCartItemQuantity'

type CartCardProps = {
  item: {
    _id: string
    size: string
    color?: string
    quantity: number
    product?: ProductType
  }
}

const getProductLabel = (product?: ProductType) =>
  product?.name ?? product?._id ?? '알 수 없는 상품'

const getProductImage = (product?: ProductType) =>
  product?.image?.[0] ?? null

export default function CartCard({ item }: CartCardProps) {
  const updateQuantity = useUpdateCartItemQuantity()
  const removeItem = useRemoveCartItemById()
  const isUpdating = updateQuantity.isPending || removeItem.isPending

  const handleChangeQuantity = (nextQuantity: number) => {
    if (nextQuantity < 1) {
      return
    }
    updateQuantity.mutate({ id: item._id, quantity: nextQuantity })
  }

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        {getProductImage(item.product) ? (
          <img
            src={getProductImage(item.product) as string}
            alt={getProductLabel(item.product)}
            className="h-16 w-16 rounded-lg object-cover"
          />
        ) : (
          <div className="h-16 w-16 rounded-lg bg-slate-100" />
        )}
        <div>
          <p className="text-sm font-semibold text-slate-900">
            {getProductLabel(item.product)}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            사이즈 {item.size} · 색상 {item.color ?? '-'} · 수량 {item.quantity}
          </p>
        </div>
      </div>
        <div className="flex items-center justify-between gap-4 sm:justify-end">
        <div className="flex items-center rounded-full border border-slate-200">
          <button
            type="button"
            className="h-9 w-9 rounded-full text-lg text-slate-600 transition hover:bg-slate-100"
            aria-label="수량 감소"
            onClick={() => handleChangeQuantity(item.quantity - 1)}
            disabled={isUpdating || item.quantity <= 1}
          >
            -
          </button>
          <span className="min-w-[28px] text-center text-sm font-semibold text-slate-900">
            {item.quantity}
          </span>
          <button
            type="button"
            className="h-9 w-9 rounded-full text-lg text-slate-600 transition hover:bg-slate-100"
            aria-label="수량 증가"
            onClick={() => handleChangeQuantity(item.quantity + 1)}
            disabled={isUpdating}
          >
            +
          </button>
        </div>
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:bg-slate-100"
          aria-label="삭제"
          onClick={() => removeItem.mutate({ id: item._id })}
          disabled={isUpdating}
        >
          <FaRegTrashAlt className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
