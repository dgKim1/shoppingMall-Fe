import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Button, Dropdown, FilterSidebar } from '../../common'
import type { FilterState } from '../../common/FilterSidebar'
import useGetAllProducts from '../../hooks/product/useGetAllProducts'
import ProductCard from './component/ProductCard'

export default function MainPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const {
    data: productsResponse,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetAllProducts({ limit: 9 })
  const products = productsResponse?.pages.flatMap((page) => page.data) ?? []
  const totalCount = productsResponse?.pages[0]?.total ?? products.length
  const formatPrice = (price: number) =>
    `${new Intl.NumberFormat('ko-KR').format(price)} 원`
  const sentinelRef = useRef<HTMLDivElement | null>(null)
  const [filters, setFilters] = useState<FilterState>({
    성별: [],
    스포츠: [],
    가격대: [],
    브랜드: [],
    색상: [],
  })
  const initializedRef = useRef(false)

  const toggleFilter = (group: keyof FilterState, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [group]: prev[group].includes(value)
        ? prev[group].filter((item) => item !== value)
        : [...prev[group], value],
    }))
  }

  useEffect(() => {
    if (initializedRef.current) {
      return
    }

    const readValues = (key: keyof FilterState) =>
      searchParams.get(key)?.split(',').filter(Boolean) ?? []

    setFilters({
      성별: readValues('성별'),
      스포츠: readValues('스포츠'),
      가격대: readValues('가격대'),
      브랜드: readValues('브랜드'),
      색상: readValues('색상'),
    })
    initializedRef.current = true
  }, [searchParams])

  useEffect(() => {
    if (!initializedRef.current) {
      return
    }

    const nextParams = new URLSearchParams()
    ;(Object.keys(filters) as (keyof FilterState)[]).forEach((key) => {
      if (filters[key].length > 0) {
        nextParams.set(key, filters[key].join(','))
      }
    })

    setSearchParams(nextParams, { replace: true })
  }, [filters, setSearchParams])

  const parsePriceRange = (label: string) => {
    const numbers = label
      .replace(/[^0-9-]/g, '')
      .split('-')
      .map((item) => Number(item))
      .filter((item) => !Number.isNaN(item))
    if (numbers.length >= 2) {
      return { min: numbers[0], max: numbers[1] }
    }
    return null
  }

  const hasActiveFilters = Object.values(filters).some(
    (values) => values.length > 0,
  )
  const filteredProducts = useMemo(() => {
    if (!hasActiveFilters) {
      return products
    }

    return products.filter((product) => {
      const matchesGender =
        filters.성별.length === 0 ||
        (product.gender && filters.성별.includes(product.gender))
      const matchesBrand =
        filters.브랜드.length === 0 ||
        (product.brand && filters.브랜드.includes(product.brand))
      const matchesSport =
        filters.스포츠.length === 0 ||
        (product.category &&
          product.category.some((item) => filters.스포츠.includes(item)))
      const matchesColor =
        filters.색상.length === 0 ||
        (product.color &&
          product.color.some((color) => filters.색상.includes(color)))
      const matchesPrice =
        filters.가격대.length === 0 ||
        filters.가격대.some((range) => {
          const parsed = parsePriceRange(range)
          if (!parsed) {
            return false
          }
          return product.price >= parsed.min && product.price <= parsed.max
        })

      return (
        matchesGender &&
        matchesBrand &&
        matchesSport &&
        matchesColor &&
        matchesPrice
      )
    })
  }, [filters, hasActiveFilters, products])
  const displayCount = hasActiveFilters
    ? filteredProducts.length
    : totalCount
  const titleRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) {
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      { rootMargin: '200px' },
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

  useEffect(() => {
    const updateTitleOffset = () => {
      const height = titleRef.current?.offsetHeight ?? 0
      document.documentElement.style.setProperty(
        '--title-section-offset',
        `${height}px`,
      )
    }

    updateTitleOffset()
    window.addEventListener('resize', updateTitleOffset)
    return () => window.removeEventListener('resize', updateTitleOffset)
  }, [])

  return (
    <section className="px-8 py-10">
      <div
        ref={titleRef}
        className="title-section fade-in sticky z-20 -mx-6 bg-white/95 px-6 py-6 backdrop-blur"
        style={{ top: 'var(--navbar-offset, 0px)' }}
      >
        <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
          Shop the look
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
              아스트로그래버 ({displayCount})
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              레트로 감성으로 완성한 데일리 스니커즈 컬렉션
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <Button variant="outline" size="sm">
              필터 숨기기
            </Button>
            <Dropdown
              label="정렬 기준: 추천순"
              items={[
                { label: '추천순' },
                { label: '신상품' },
                { label: '가격 낮은순' },
                { label: '가격 높은순' },
              ]}
            />
          </div>
        </div>
      </div>

      <div className="mt-8 flex gap-10">
        <aside
          className="w-[220px] shrink-0 self-start sticky"
          style={{
            top: 'calc(var(--navbar-offset, 0px) + var(--title-section-offset, 0px))',
          }}
        >
          <FilterSidebar selectedFilters={filters} onToggleFilter={toggleFilter} />
        </aside>
        <div className="products-section grid flex-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading && (
            <p className="text-sm text-slate-500 sm:col-span-2 lg:col-span-3">
              상품을 불러오는 중입니다...
            </p>
          )}
          {isError && (
            <p className="text-sm text-rose-500 sm:col-span-2 lg:col-span-3">
              상품을 불러오지 못했습니다.
            </p>
          )}
          {!isLoading &&
            !isError &&
            filteredProducts.map((item, index) => (
              <ProductCard
                key={`${item.sku}-${index}`}
                product={item}
                index={index}
                priceLabel={formatPrice(item.price)}
              />
            ))}
          {!isLoading && !isError && hasNextPage && (
            <div
              ref={sentinelRef}
              className="h-10 sm:col-span-2 lg:col-span-3"
            />
          )}
          {isFetchingNextPage && (
            <p className="text-sm text-slate-500 sm:col-span-2 lg:col-span-3">
              상품을 더 불러오는 중입니다...
            </p>
          )}

          <article className="sm:col-span-2 lg:col-span-3">
            <div className="mt-4 grid gap-4 lg:grid-cols-[1.2fr_1fr]">
              <div className="aspect-[16/9] w-full bg-slate-200" />
              <div className="flex flex-col justify-center space-y-3 bg-slate-900 px-6 py-10 text-white">
                <p className="text-xs uppercase tracking-[0.25em] text-white/70">
                  Lookbook
                </p>
                <h3 className="text-2xl font-semibold">
                  astrogabber 이야기
                </h3>
                <p className="text-sm text-white/70">
                  레트로 그린 컬러로 완성한 시즌 무드.
                </p>
                <Button variant="outline" size="sm" className="border-white/40 text-white hover:bg-white/10">
                  스토리 보기
                </Button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
