import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CartIcon, HeartIcon } from '../../common'
import useAddToWishlist from '../../hooks/wishlist/useAddToWishlist'
import useAddToCart from '../../hooks/cart/useAddToCart'
import useGetProductBySku from '../../hooks/product/useGetProductBySku'
import type { ProductType } from '../../type/product'

type ProductDetailContentProps = {
  product?: ProductType
  images: string[]
  thumbnails: (string | null)[]
}

function ProductDetailContent({
  product,
  images,
  thumbnails,
}: ProductDetailContentProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [cartError, setCartError] = useState<string | null>(null)
  const [wishlistError, setWishlistError] = useState<string | null>(null)
  const addToCart = useAddToCart()
  const addToWishlist = useAddToWishlist()
  const formatPrice = (price?: number) =>
    typeof price === 'number'
      ? `${new Intl.NumberFormat('ko-KR').format(price)} 원`
      : '-'
  const hasMultipleImages = images.length > 1

  const sizeOptions = (() => {
    const category = product?.categoryMain
    if (product?.stock) {
      return Object.keys(product.stock)
    }
    if (category === '신발') {
      return Array.from({ length: 11 }, (_, index) => `${235 + index * 5}`)
    }
    if (category === '액세서리') {
      return ['S', 'M', 'L']
    }
    if (category === '의류') {
      return ['S', 'M', 'L', 'XL', 'XXL']
    }
    return ['2T', '3T', '4T', '5T', '6T', '7T']
  })()

  const normalizeSize = (value: string) => {
    const mapping: Record<string, string> = {
      '90': 'S',
      '95': 'M',
      '100': 'L',
      '105': 'XL',
      '110': 'XXL',
    }
    return mapping[value] ?? value
  }
  const sizeInventory = product?.stock ?? null
  const isSizeInStock = (size: string) => {
    if (!sizeInventory) {
      return true
    }
    return (sizeInventory[size] ?? 0) > 0
  }
  const getApiErrorMessage = (error: unknown) => {
    if (!error) {
      return null
    }
    const responseMessage =
      (error as { response?: { data?: { message?: string; error?: string } } })
        .response?.data?.message ??
      (error as { response?: { data?: { message?: string; error?: string } } })
        .response?.data?.error
    if (responseMessage) {
      return responseMessage
    }
    if (typeof error === 'string') {
      return error
    }
    if (error instanceof Error && error.message) {
      return error.message
    }
    return null
  }
  const addToCartErrorMessage = getApiErrorMessage(addToCart.error)

  return (
    <>
      <div className="grid gap-12 lg:grid-cols-[72px_1fr_360px]">
        <div className="hidden flex-col gap-3 lg:flex">
          {thumbnails.map((thumbnail: string | null, index: number) => (
            <button
              key={index}
              type="button"
              className={`h-16 w-16 overflow-hidden rounded-lg border bg-slate-100 ${
                images[index] && activeIndex === index
                  ? 'border-slate-900'
                  : 'border-slate-200'
              }`}
              aria-label={`thumbnail ${index + 1}`}
              onClick={() => {
                if (images[index]) {
                  setActiveIndex(index)
                }
              }}
              disabled={!images[index]}
            >
              {thumbnail ? (
                <img
                  src={thumbnail}
                  alt={product?.name ?? 'product image'}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="h-full w-full bg-slate-200" />
              )}
            </button>
          ))}
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-slate-100">
          {images.length > 0 ? (
            <img
              src={images[activeIndex]}
              alt={product?.name ?? 'product image'}
              className="aspect-[4/5] w-full object-cover"
            />
          ) : (
            <div className="aspect-[4/5] w-full bg-slate-200" />
          )}
          <div className="absolute bottom-4 right-4 flex gap-2">
            <button
              type="button"
              className="h-9 w-9 rounded-full border border-white bg-white/90 text-sm shadow disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="previous image"
              onClick={() => {
                if (images.length > 0) {
                  setActiveIndex(
                    (prev) => (prev - 1 + images.length) % images.length,
                  )
                }
              }}
              disabled={!hasMultipleImages}
            >
              ◀
            </button>
            <button
              type="button"
              className="h-9 w-9 rounded-full border border-white bg-white/90 text-sm shadow disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="next image"
              onClick={() => {
                if (images.length > 0) {
                  setActiveIndex((prev) => (prev + 1) % images.length)
                }
              }}
              disabled={!hasMultipleImages}
            >
              ▶
            </button>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              {product?.name ?? '상품명'}
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              {product?.description ?? '상품 설명이 없습니다.'}
            </p>
            <p className="mt-4 text-lg font-semibold text-slate-900">
              {formatPrice(product?.price)}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              color
            </p>
            <div className="mt-3 flex gap-3">
              {(product?.color ?? []).map((color: string) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => {
                    setSelectedColor((prev) => (prev === color ? null : color))
                    setCartError(null)
                  }}
                  className={`relative flex h-14 w-14 items-center justify-center rounded-xl border ${
                    selectedColor === color
                      ? 'border-slate-900 ring-2 ring-slate-900'
                      : 'border-slate-200'
                  } ${color}`}
                  aria-pressed={selectedColor === color}
                  aria-label={`색상 ${color.replace('bg-', '')}`}
                >
                  {selectedColor === color && (
                    <span className="text-xs font-semibold text-white drop-shadow">
                      ✓
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-900">
                사이즈 선택
              </p>
              <button
                type="button"
                className="text-xs font-semibold text-slate-500"
              >
                사이즈 가이드
              </button>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-3">
              {sizeOptions.map((size) => {
                const inStock = isSizeInStock(size)
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => {
                      if (inStock) {
                        setSelectedSize((prev) => (prev === size ? null : size))
                        setCartError(null)
                      }
                    }}
                    disabled={!inStock}
                    className={`rounded-lg border py-2 text-sm font-semibold transition ${
                      selectedSize === size && inStock
                        ? 'border-slate-900 bg-slate-900 text-white'
                        : 'border-slate-200 text-slate-700 hover:border-slate-400'
                    } ${!inStock ? 'cursor-not-allowed opacity-40' : ''}`}
                  >
                    {size}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="space-y-3">
            <button
              type="button"
              className="relative flex h-12 w-full items-center justify-center rounded-full bg-slate-900 text-sm font-semibold leading-none text-white"
              onClick={() => {
                if (!product?._id) {
                  setCartError('상품 정보를 찾을 수 없습니다.')
                  return
                }
                if (!selectedSize) {
                  setCartError('사이즈를 선택해 주세요.')
                  return
                }
                if (!isSizeInStock(selectedSize)) {
                  setCartError('선택한 사이즈는 품절입니다.')
                  return
                }
                if (!selectedColor) {
                  setCartError('색상을 선택해 주세요.')
                  return
                }
                setCartError(null)
                addToCart.mutate({
                  productId: product._id,
                  size: normalizeSize(selectedSize),
                  color: selectedColor,
                  quantity: 1,
                })
              }}
              disabled={addToCart.isPending}
            >
              <span className="absolute left-5 flex h-5 w-5 items-center justify-center">
                <CartIcon className="h-8 w-8" />
              </span>
              {addToCart.isPending ? '담는 중...' : '장바구니'}
            </button>
            <button
              type="button"
              className="relative flex h-12 w-full items-center justify-center rounded-full border border-slate-200 text-sm font-semibold leading-none text-slate-700"
              onClick={() => {
                if (!product?._id) {
                  setWishlistError(
                    '위시리스트 추가 실패. 해당 제품은 존재하지 않는 제품입니다',
                  )
                  return
                }
                setWishlistError(null)
                addToWishlist.mutate({ productId: product._id })
              }}
              disabled={addToWishlist.isPending}
            >
              <span className="absolute left-5 flex h-5 w-5 items-center justify-center">
                <HeartIcon className="h-5 w-5" />
              </span>
              위시리스트
            </button>
            {cartError && <p className="text-xs text-rose-500">{cartError}</p>}
            {wishlistError && (
              <p className="text-xs text-rose-500">{wishlistError}</p>
            )}
            {addToCart.isError && (
              <p className="text-xs text-rose-500">
                {addToCartErrorMessage ?? '장바구니 담기에 실패했습니다.'}
              </p>
            )}
            {addToWishlist.isError && (
              <p className="text-xs text-rose-500">
                {'위시리스트 추가에 실패했습니다'}
              </p>
            )}
          </div>

          <div className="space-y-2 text-sm text-slate-600">
            <p className="font-semibold text-slate-900">무료 픽업</p>
            <p>매장 찾기</p>
            <p className="text-xs">주문결제 시 매장 픽업 선택 가능</p>
          </div>
        </div>
      </div>

      <div className="mt-16 max-w-2xl text-sm text-slate-600">
        <p className="font-semibold text-slate-900">상품 설명</p>
        <p className="mt-4 leading-7">
          {product?.description ??
            '나이키는 누구든 운동선수로서 태어난다고 믿습니다. 아이에게 조화로운 프렌치 테리 세트를 입혀 편안하게 놀아보세요.'}
        </p>
      </div>
    </>
  )
}

export default function ProductDetailPage() {
  const { sku } = useParams()
  const { data: productResponse, isLoading, isError } = useGetProductBySku(sku)
  const product = productResponse?.data
  const images = useMemo(() => product?.image ?? [], [product?.image])
  const thumbnails = useMemo(
    () => (images.length > 0 ? images : Array.from({ length: 6 }, () => null)),
    [images],
  )

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      {isLoading && (
        <p className="text-sm text-slate-500">상품을 불러오는 중입니다...</p>
      )}
      {isError && (
        <p className="text-sm text-rose-500">상품을 불러오지 못했습니다.</p>
      )}
      {!isLoading && !isError && (
        <ProductDetailContent
          key={product?.sku ?? 'product'}
          product={product}
          images={images}
          thumbnails={thumbnails}
        />
      )}
    </section>
  )
}
