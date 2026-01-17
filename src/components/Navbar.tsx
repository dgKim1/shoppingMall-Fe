import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Button, Dropdown } from '../common'
import { linkBase, MEGA_MENU } from '../const/NavBar/const'
export type MegaMenuKey = keyof typeof MEGA_MENU
export default function Navbar() {
  const headerRef = useRef<HTMLElement>(null)
  const lastScrollY = useRef(0)
  const [isVisible, setIsVisible] = useState(true)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const updateOffset = () => {
      const height = headerRef.current?.offsetHeight ?? 0
      setOffset(height)
    }

    updateOffset()
    window.addEventListener('resize', updateOffset)

    return () => window.removeEventListener('resize', updateOffset)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--navbar-offset', isVisible ? `${offset}px` : '0px')
  }, [isVisible, offset])

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      const currentY = window.scrollY
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const delta = currentY - lastScrollY.current
          if (currentY <= 10) {
            setIsVisible(true)
          } else if (Math.abs(delta) > 6) {
            setIsVisible(delta < 0)
          }
          lastScrollY.current = currentY
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      ref={headerRef}
      className={`fixed left-0 right-0 top-0 z-40 border-b border-slate-200 bg-white transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center gap-6 px-6 py-4">
        <NavLink to="/" className="text-lg font-semibold">
          nodeShop
        </NavLink>
        <div className="hidden flex-1 items-center justify-center gap-2 md:flex">
          <NavLink
            to="/new"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? 'text-slate-900' : 'text-slate-500'}`
            }
          >
            New
          </NavLink>
          {(['Men', 'Women', 'Kids'] as MegaMenuKey[]).map((menuKey) => (
            <div key={menuKey} className="relative group">
              <NavLink
                to={`/${menuKey}`}
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? 'text-slate-900' : 'text-slate-500'}`
                }
              >
                {menuKey}
              </NavLink>
              <div
                className="pointer-events-none fixed left-0 right-0 z-30 border-t border-slate-200 bg-white px-12 py-8 opacity-0 transition duration-200 group-hover:pointer-events-auto group-hover:opacity-100"
                style={{ top: 'var(--navbar-offset, 0px)' }}
              >
                <div className="grid grid-cols-3 gap-10 text-sm text-slate-600">
                  {MEGA_MENU[menuKey].map((section) => (
                    <div key={section.title} className="space-y-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                        {section.title}
                      </p>
                      <div className="grid gap-2">
                        {section.items.map((item) => (
                          <button
                            key={item}
                            type="button"
                            className="text-left text-sm text-slate-700 transition hover:text-slate-900"
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
          <NavLink
            to="/Jordan"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? 'text-slate-900' : 'text-slate-500'}`
            }
          >
            Jordan
          </NavLink>
        </div>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-[18px] w-[18px] shrink-0 stroke-slate-500"
              width="18"
              height="18"
              fill="none"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" />
            </svg>
            <input
              type="text"
              placeholder="검색"
              className="w-28 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-500 sm:w-36"
            />
          </label>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-9 w-9 rounded-full p-0"
            aria-label="찜"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-[18px] w-[18px] shrink-0"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <path d="M12 20s-6-4.3-8.5-7.6C1.6 10.3 2.1 7.5 4 6a4.5 4.5 0 0 1 6 1.1L12 9l2-1.9A4.5 4.5 0 0 1 20 6c1.9 1.5 2.4 4.3.5 6.4C18 15.7 12 20 12 20z" />
            </svg>
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-9 w-9 rounded-full p-0"
            aria-label="장바구니"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-[18px] w-[18px] shrink-0"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <path d="M7 7h10l1 10H6L7 7z" />
              <path d="M9 7V6a3 3 0 0 1 6 0v1" />
            </svg>
          </Button>
          <Dropdown
            items={[{ label: '로그인' }]}
            trigger={({ buttonProps }) => (
              <Button
                {...buttonProps}
                variant="ghost"
                size="sm"
                className="h-9 w-9 rounded-full p-0"
                aria-label="내 정보"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-[18px] w-[18px] shrink-0"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4z" />
                  <path d="M4 20a8 8 0 0 1 16 0" />
                </svg>
              </Button>
            )}
          />
        </div>
      </nav>
    </header>
  )
}
