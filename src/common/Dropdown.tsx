import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'

type DropdownItem = {
  label: string
  onSelect?: () => void
  disabled?: boolean
}

type DropdownProps = {
  label?: string
  items: DropdownItem[]
  align?: 'left' | 'right'
  position?: 'top' | 'bottom'
  trigger?: (props: {
    isOpen: boolean
    toggle: () => void
    buttonProps: ButtonHTMLAttributes<HTMLButtonElement>
  }) => ReactNode
}

export default function Dropdown({
  label,
  items,
  align = 'right',
  position = 'bottom',
  trigger,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const toggle = () => setIsOpen((prev) => !prev)
  const buttonProps = {
    type: 'button' as const,
    'aria-haspopup': 'menu' as const,
    'aria-expanded': isOpen,
    onClick: toggle,
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div ref={containerRef} className="relative inline-flex">
      {trigger ? (
        trigger({ isOpen, toggle, buttonProps })
      ) : (
        <button
          {...buttonProps}
          className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs uppercase tracking-wide text-slate-600 transition hover:bg-slate-100"
        >
          {label}
        </button>
      )}
      {isOpen && (
        <div
          role="menu"
          className={`absolute z-20 w-40 rounded-xl border border-slate-200 bg-white p-2 text-sm text-slate-600 shadow-lg ${
            position === 'bottom' ? 'mt-2' : 'mb-2'
          } ${position === 'bottom' ? 'top-full' : 'bottom-full'} ${
            align === 'right' ? 'right-0' : 'left-0'
          }`}
        >
          {items.map((item) => (
            <button
              key={item.label}
              type="button"
              role="menuitem"
              disabled={item.disabled}
              onClick={() => {
                item.onSelect?.()
                setIsOpen(false)
              }}
              className="w-full rounded-lg px-3 py-2 text-left transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
