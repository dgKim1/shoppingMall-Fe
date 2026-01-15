import { Button, Dropdown } from '../../common'

export default function MainPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      <div className="fade-in">
        <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
          Shop the look
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
              아스트로그래버 (11)
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

      <div className="mt-8 grid gap-10 lg:grid-cols-[220px_1fr]">
        <aside className="fade-up space-y-6 text-sm text-slate-600">
          {[
            { title: '성별', items: ['남성', '여성', '남녀공용'] },
            { title: '스포츠', items: ['라이프스타일'] },
            {
              title: '가격대',
              items: ['100,000 - 150,000 원', '150,000 - 200,000 원'],
            },
            {
              title: '브랜드',
              items: ['나이키 스포츠웨어', 'NikeLab'],
            },
          ].map((group) => (
            <div key={group.title} className="border-b border-slate-200 pb-4">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                <span>{group.title}</span>
                <span className="text-slate-400">˅</span>
              </div>
              <div className="mt-3 space-y-2">
                {group.items.map((item) => (
                  <label
                    key={item}
                    className="flex items-center gap-2 text-sm text-slate-600"
                  >
                    <input
                      type="checkbox"
                      className="h-3.5 w-3.5 rounded border-slate-300"
                    />
                    {item}
                  </label>
                ))}
              </div>
            </div>
          ))}
          <div className="border-b border-slate-200 pb-4">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
              <span>색상</span>
              <span className="text-slate-400">˅</span>
            </div>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {[
                'bg-black',
                'bg-white',
                'bg-red-500',
                'bg-emerald-500',
                'bg-sky-500',
                'bg-amber-500',
                'bg-slate-400',
                'bg-lime-500',
              ].map((color) => (
                <button
                  key={color}
                  className={`h-5 w-5 rounded-full border border-slate-200 ${color}`}
                />
              ))}
            </div>
          </div>
        </aside>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: '나이키 아스트로그래버 레더',
              subtitle: '여성 신발',
              price: '149,000 원',
              tag: '신제품',
            },
            {
              name: '나이키 아스트로그래버 텍스타일',
              subtitle: '여성 신발',
              price: '139,000 원',
              tag: '신제품',
            },
            {
              name: '나이키 아스트로그래버 레더',
              subtitle: '여성 신발',
              price: '149,000 원',
              tag: '리미티드',
            },
            {
              name: '나이키 아스트로그래버',
              subtitle: '남성 신발',
              price: '149,000 원',
              tag: '신제품',
            },
            {
              name: '나이키 아스트로그래버 에센셜',
              subtitle: '여성 신발',
              price: '129,000 원',
              tag: '베스트',
            },
            {
              name: '나이키 아스트로그래버 프리미엄',
              subtitle: '남녀공용 신발',
              price: '159,000 원',
              tag: '신제품',
            },
          ].map((item, index) => (
            <article
              key={item.name}
              className={`fade-up delay-${(index + 1) * 120} space-y-3`}
            >
              <div className="aspect-[4/3] w-full bg-slate-100" />
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-[0.2em] text-rose-500">
                  {item.tag}
                </p>
                <h3 className="text-sm font-semibold text-slate-900">
                  {item.name}
                </h3>
                <p className="text-xs text-slate-500">{item.subtitle}</p>
                <p className="text-sm font-semibold text-slate-900">
                  {item.price}
                </p>
              </div>
            </article>
          ))}

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
