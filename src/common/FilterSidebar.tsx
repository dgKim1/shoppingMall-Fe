const FILTER_GROUPS = [
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
] as const

const COLOR_SWATCHES = [
  'bg-black',
  'bg-white',
  'bg-red-500',
  'bg-emerald-500',
  'bg-sky-500',
  'bg-amber-500',
  'bg-slate-400',
  'bg-lime-500',
] as const

export default function FilterSidebar() {
  return (
    <aside className="fade-up space-y-6 text-sm text-slate-600">
      {FILTER_GROUPS.map((group) => (
        <div key={group.title} className="border-b border-slate-200 pb-4">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
            <span>{group.title}</span>
            <span className="text-slate-400">?</span>
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
          <span className="text-slate-400">?</span>
        </div>
        <div className="mt-3 grid grid-cols-4 gap-2">
          {COLOR_SWATCHES.map((color) => (
            <button
              key={color}
              className={`h-5 w-5 rounded-full border border-slate-200 ${color}`}
              type="button"
              aria-label={`색상 ${color.replace('bg-', '')}`}
            />
          ))}
        </div>
      </div>
    </aside>
  )
}
