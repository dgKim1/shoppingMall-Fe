export default function ProductDetailPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid gap-12 lg:grid-cols-[72px_1fr_360px]">
        <div className="hidden flex-col gap-3 lg:flex">
          {Array.from({ length: 6 }).map((_, index) => (
            <button
              key={index}
              type="button"
              className="h-16 w-16 overflow-hidden rounded-lg border border-slate-200 bg-slate-100"
              aria-label={`thumbnail ${index + 1}`}
            >
              <div className="h-full w-full bg-slate-200" />
            </button>
          ))}
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-slate-100">
          <div className="aspect-[4/5] w-full bg-slate-200" />
          <div className="absolute bottom-4 right-4 flex gap-2">
            <button
              type="button"
              className="h-9 w-9 rounded-full border border-white bg-white/90 text-sm shadow"
              aria-label="previous image"
            >
              ◀
            </button>
            <button
              type="button"
              className="h-9 w-9 rounded-full border border-white bg-white/90 text-sm shadow"
              aria-label="next image"
            >
              ▶
            </button>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              나이키 E1D1
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              유아 프렌치 테리 투피스 그래픽 크루 세트
            </p>
            <p className="mt-4 text-lg font-semibold text-slate-900">
              85,000 원
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              color
            </p>
            <div className="mt-3 flex gap-3">
              <button
                type="button"
                className="h-14 w-14 rounded-xl border border-slate-200 bg-slate-100"
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
              <p className="text-sm font-semibold text-slate-900">사이즈 선택</p>
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
          나이키는 누구든 운동선수로서 태어난다고 믿습니다. 아이에게
          조화로운 프렌치 테리 세트를 입혀 편안하게 놀아보세요. 부드러운
          소재감과 여유로운 핏으로 데일리 룩을 완성합니다.
        </p>
      </div>
    </section>
  )
}
