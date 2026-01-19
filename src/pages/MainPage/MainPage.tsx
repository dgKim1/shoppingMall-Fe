import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Button, Dropdown, FilterSidebar } from '../../common'
import type { FilterState } from '../../components/FilterSidebar'
import type { ProductType } from '../../type/product'
import useGetAllProducts from '../../hooks/product/useGetAllProducts'
import useSearchProducts from '../../hooks/product/useSearchProducts'
import ProductCard from './component/ProductCard'
import AdBanner from './component/AdBanner'

export default function MainPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [sortOption, setSortOption] = useState('선택안함')
  const {
    data: allProductsResponse,
    isLoading: isAllLoading,
    isError: isAllError,
    fetchNextPage: fetchAllNextPage,
    hasNextPage: hasAllNextPage,
    isFetchingNextPage: isFetchingAllNextPage,
  } = useGetAllProducts({
    limit: 9,
    sort: sortOption === '선택안함' ? undefined : sortOption,
  })
  const searchTerm = searchParams.get('name')
  const isSearching = Boolean(searchTerm)
  const {
    data: searchProductsResponse,
    isLoading: isSearchLoading,
    isError: isSearchError,
    fetchNextPage: fetchSearchNextPage,
    hasNextPage: hasSearchNextPage,
    isFetchingNextPage: isFetchingSearchNextPage,
  } = useSearchProducts(
    { name: searchTerm ?? undefined, limit: 9 },
    { enabled: isSearching },
  )
  const activeResponse = isSearching
    ? searchProductsResponse
    : allProductsResponse
  const products = activeResponse?.pages.flatMap((page) => page.data) ?? []
  const safeProducts = useMemo(
    () => products.filter((item): item is ProductType => Boolean(item)),
    [products],
  )
  const totalCount = activeResponse?.pages[0]?.total ?? products.length
  const isLoading = isSearching ? isSearchLoading : isAllLoading
  const isError = isSearching ? isSearchError : isAllError
  const hasNextPage = isSearching ? hasSearchNextPage : hasAllNextPage
  const fetchNextPage = isSearching ? fetchSearchNextPage : fetchAllNextPage
  const isFetchingNextPage = isSearching
    ? isFetchingSearchNextPage
    : isFetchingAllNextPage
  const formatPrice = (price: number) =>
    `${new Intl.NumberFormat('ko-KR').format(price)} 원`
  const sentinelRef = useRef<HTMLDivElement | null>(null)
  const categoryMain = searchParams.get('categoryMain')
  const categorySub = searchParams.get('categorySub')
  const [isSidebarVisible, setIsSidebarVisible] = useState(true)

  const toggleFilter = (group: keyof FilterState, value: string) => {
    const nextParams = new URLSearchParams(searchParams)
    const currentValues = nextParams.get(group)?.split(',').filter(Boolean) ?? []
    const nextValues = currentValues.includes(value)
      ? currentValues.filter((item) => item !== value)
      : [...currentValues, value]
    if (nextValues.length > 0) {
      nextParams.set(group, nextValues.join(','))
    } else {
      nextParams.delete(group)
    }
    setSearchParams(nextParams, { replace: true })
  }

  const filters = useMemo<FilterState>(() => {
    const readValues = (key: keyof FilterState) =>
      searchParams.get(key)?.split(',').filter(Boolean) ?? []
    return {
      성별: readValues('성별'),
      스포츠: readValues('스포츠'),
      가격대: readValues('가격대'),
      브랜드: readValues('브랜드'),
      색상: readValues('색상'),
    }
  }, [searchParams])

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
      return safeProducts
    }

    return safeProducts.filter((product) => {
      const matchesGender =
        filters.성별.length === 0 ||
        (product.gender && filters.성별.includes(product.gender))
      const matchesBrand =
        filters.브랜드.length === 0 ||
        (product.brand && filters.브랜드.includes(product.brand))
      const matchesSport =
        filters.스포츠.length === 0 ||
        (product.categoryMain &&
          filters.스포츠.includes(product.categoryMain)) ||
        (product.categorySub && filters.스포츠.includes(product.categorySub))
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
      const matchesCategoryMain =
        !categoryMain || product.categoryMain === categoryMain
      const matchesCategorySub =
        !categorySub || product.categorySub === categorySub

      return (
        matchesGender &&
        matchesBrand &&
        matchesSport &&
        matchesColor &&
        matchesPrice &&
        matchesCategoryMain &&
        matchesCategorySub
      )
    })
  }, [categoryMain, categorySub, filters, hasActiveFilters, safeProducts])
  const displayCount = hasActiveFilters
    ? filteredProducts.length
    : totalCount
  const titleRef = useRef<HTMLDivElement | null>(null)


  // 무한 스크롤 기능을 위한 서버 상태 동기화
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

  //스크롤시 NavBar 애니메이션
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
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsSidebarVisible((prev) => !prev)}
            >
              <span className="mr-2 inline-flex h-4 w-4 items-center justify-center">
                <svg
                  aria-hidden="true"
                  className="h-4 w-4"
                  focusable="false"
                  viewBox="0 0 24 24"
                  role="img"
                  fill="none"
                >
                  <path
                    stroke="currentColor"
                    strokeWidth="1.5"
                    d="M21 8.25H10m-5.25 0H3m0 7.5h10.75m5 0H21m-2.25 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zM7.5 6a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"
                  />
                </svg>
              </span>
              {isSidebarVisible ? '필터 숨기기' : '필터 표시'}
            </Button>
            <Dropdown
              label={`정렬 기준: ${sortOption}`}
              items={[
                { label: '선택안함', onSelect: () => setSortOption('선택안함') },
                { label: '추천순', onSelect: () => setSortOption('추천순') },
                { label: '신상품', onSelect: () => setSortOption('신상품') },
                {
                  label: '가격 낮은순',
                  onSelect: () => setSortOption('가격 낮은순'),
                },
                {
                  label: '가격 높은순',
                  onSelect: () => setSortOption('가격 높은순'),
                },
              ]}
            />
          </div>
        </div>
      </div>

      <div
        className={`mt-8 flex transition-all duration-300 ${
          isSidebarVisible ? 'gap-10' : 'gap-0'
        }`}
      >
        <aside
          className={`self-start sticky overflow-hidden transition-all duration-300 ${
            isSidebarVisible
              ? 'w-[220px] flex-[0_0_220px] opacity-100'
              : 'w-0 flex-[0_0_0] opacity-0 pointer-events-none'
          } min-w-0`}
          style={{
            top: 'calc(var(--navbar-offset, 0px) + var(--title-section-offset, 0px))',
          }}
          aria-hidden={!isSidebarVisible}
        >
          <FilterSidebar
            selectedFilters={filters}
            onToggleFilter={toggleFilter}
          />
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

          <AdBanner />
        </div>
      </div>
    </section>
  )
}
