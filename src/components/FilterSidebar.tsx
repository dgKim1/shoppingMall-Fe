import { useMemo, useState } from 'react'
import { HiChevronDown, HiChevronUp } from 'react-icons/hi2'
import { FILTER_GROUPS } from '../const/FilterSidebar/const'

type FilterKey = '성별' | '스포츠' | '가격대' | '브랜드' | '색상'

export type FilterState = {
  성별: string[]
  스포츠: string[]
  가격대: string[]
  브랜드: string[]
  색상: string[]
}

type FilterSidebarProps = {
  selectedFilters: FilterState
  onToggleFilter: (group: FilterKey, value: string) => void
}

export default function FilterSidebar({
  selectedFilters,
  onToggleFilter,
}: FilterSidebarProps) {
  const initialOpenState = useMemo(() => {
    return FILTER_GROUPS.reduce<Record<string, boolean>>((acc, group) => {
      acc[group.title] = true
      return acc
    }, {})
  }, [])
  const [openGroups, setOpenGroups] =
    useState<Record<string, boolean>>(initialOpenState)

  const toggleGroup = (title: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [title]: !prev[title],
    }))
  }

  return (
    <aside className="fade-up space-y-6 text-sm text-slate-600">
      {FILTER_GROUPS.map((group) => (
        <div key={group.title} className="border-b border-slate-200 pb-4">
          <button
            type="button"
            className="flex w-full items-center justify-between text-xs font-semibold uppercase tracking-[0.25em] text-slate-500"
            onClick={() => toggleGroup(group.title)}
            aria-expanded={openGroups[group.title]}
            aria-controls={`filter-group-${group.title}`}
          >
            <span>{group.title}</span>
            <span className="text-slate-400 cursor-pointer">
              {openGroups[group.title] ? <HiChevronUp /> : <HiChevronDown />}
            </span>
          </button>
          {'items' in group && openGroups[group.title] && (
            <div
              id={`filter-group-${group.title}`}
              className="mt-3 space-y-2"
            >
              {group.items.map((item) => (
                <label
                  key={item}
                  className="flex items-center gap-2 text-sm text-slate-600"
                >
                  <input
                    type="checkbox"
                    className="h-3.5 w-3.5 rounded border-slate-300"
                    checked={selectedFilters[group.title as FilterKey].includes(
                      item,
                    )}
                    onChange={() =>
                      onToggleFilter(group.title as FilterKey, item)
                    }
                  />
                  {item}
                </label>
              ))}
            </div>
          )}
          {'colors' in group && openGroups[group.title] && (
            <div
              id={`filter-group-${group.title}`}
              className="mt-3 grid grid-cols-4 gap-2"
            >
              {group.colors.map((color) => (
                <button
                  key={color}
                  className={`h-5 w-5 rounded-full border ${color} ${
                    selectedFilters['색상'].includes(color)
                      ? 'border-slate-900 ring-2 ring-slate-900'
                      : 'border-slate-200'
                  }`}
                  type="button"
                  aria-label={`색상 ${color.replace('bg-', '')}`}
                  aria-pressed={selectedFilters['색상'].includes(color)}
                  onClick={() => onToggleFilter('색상', color)}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </aside>
  )
}
