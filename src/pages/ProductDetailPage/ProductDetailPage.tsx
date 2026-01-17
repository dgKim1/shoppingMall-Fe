import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import useGetProductBySku from '../../hooks/product/useGetProductBySku'

export default function ProductDetailPage() {
  const { sku } = useParams()
  const { data: productResponse, isLoading, isError } = useGetProductBySku(sku)
  const product = productResponse?.data
  const images = useMemo(() => product?.image ?? [], [product?.image])
  const thumbnails = useMemo(
    () => (images.length > 0 ? images : Array.from({ length: 6 }, () => null)),
    [images],
  )
  const [activeIndex, setActiveIndex] = useState(0)
  const formatPrice = (price?: number) =>
    typeof price === 'number'
      ? `${new Intl.NumberFormat('ko-KR').format(price)} 원`
      : '-'
  const hasMultipleImages = images.length > 1

  useEffect(() => {
    setActiveIndex(0)
  }, [images.length])

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      {isLoading && (
        <p className="text-sm text-slate-500">상품을 불러오는 중입니다...</p>
      )}
      {isError && (
        <p className="text-sm text-rose-500">상품을 불러오지 못했습니다.</p>
      )}
      {!isLoading && !isError && (
        <>
          <div className="grid gap-12 lg:grid-cols-[72px_1fr_360px]">
            <div className="hidden flex-col gap-3 lg:flex">
              {thumbnails.map((thumbnail, index) => (
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
                  <button
                    type="button"
                    className={`h-14 w-14 rounded-xl border border-slate-200 ${
                      product?.color?.[0] ?? 'bg-slate-200'
                    }`}
                    aria-label="color option 1"
                  />
                  <button
                    type="button"
                    className="h-14 w-14 rounded-xl border border-slate-400 bg-slate-200"
                    aria-label="color option 2"
                  />
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
                  {['2T', '3T', '4T', '5T', '6T', '7T'].map((size) => (
                    <button
                      key={size}
                      type="button"
                      className="rounded-lg border border-slate-200 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <button
                  type="button"
                  className="h-12 w-full rounded-full bg-slate-900 text-sm font-semibold text-white"
                >
                  장바구니
                </button>
                <button
                  type="button"
                  className="h-12 w-full rounded-full border border-slate-200 text-sm font-semibold text-slate-700"
                >
                  위시리스트 ♡
                </button>
              </div>

              <div className="space-y-2 text-sm text-slate-600">
                <p className="font-semibold text-slate-900">무료 픽업</p>
                <p>매장 찾기</p>
                <p className="text-xs">
                  주문결제 시 매장 픽업 선택 가능
                </p>
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
      )}
    </section>
  )
}
