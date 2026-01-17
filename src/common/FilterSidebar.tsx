import { useState } from 'react'

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
  {
    title: '색상',
    colors: [
      'bg-black',
      'bg-white',
      'bg-red-500',
      'bg-emerald-500',
      'bg-sky-500',
      'bg-amber-500',
      'bg-slate-400',
      'bg-lime-500',
    ],
  },
] as const

export default function FilterSidebar() {
  const [selectedColors, setSelectedColors] = useState<string[]>([])

  const toggleColor = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((item) => item !== color) : [...prev, color],
    )
  }

  return (
    <aside className="fade-up space-y-6 text-sm text-slate-600">
      {FILTER_GROUPS.map((group) => (
        <div key={group.title} className="border-b border-slate-200 pb-4">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
            <span>{group.title}</span>
            <span className="text-slate-400">?</span>
          </div>
          {'items' in group && (
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
          )}
          {'colors' in group && (
            <div className="mt-3 grid grid-cols-4 gap-2">
              {group.colors.map((color) => (
                <button
                  key={color}
                  className={`h-5 w-5 rounded-full border ${color} ${
                    selectedColors.includes(color)
                      ? 'border-slate-900 ring-2 ring-slate-900'
                      : 'border-slate-200'
                  }`}
                  type="button"
                  aria-label={`색상 ${color.replace('bg-', '')}`}
                  aria-pressed={selectedColors.includes(color)}
                  onClick={() => toggleColor(color)}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </aside>
  )
}
