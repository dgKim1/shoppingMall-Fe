import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const linkBase =
  'px-3 py-2 text-sm uppercase tracking-wide transition-colors'

export default function Navbar() {
  const [isAccountOpen, setIsAccountOpen] = useState(false)

  return (
    <header className="border-b border-slate-200 bg-white">
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
          <NavLink
            to="/Men"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? 'text-slate-900' : 'text-slate-500'}`
            }
          >
            Men
          </NavLink>
          <NavLink
            to="/Women"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? 'text-slate-900' : 'text-slate-500'}`
            }
          >
            Women
          </NavLink>
          <NavLink
            to="/Kids"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? 'text-slate-900' : 'text-slate-500'}`
            }
          >
            Kids
          </NavLink>
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
              className="h-4 w-4 stroke-slate-500"
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
          
          <button
            type="button"
            className="rounded-full p-2 text-slate-700 transition hover:bg-slate-100"
            aria-label="찜"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <path d="M12 20s-6-4.3-8.5-7.6C1.6 10.3 2.1 7.5 4 6a4.5 4.5 0 0 1 6 1.1L12 9l2-1.9A4.5 4.5 0 0 1 20 6c1.9 1.5 2.4 4.3.5 6.4C18 15.7 12 20 12 20z" />
            </svg>
          </button>
          <button
            type="button"
            className="rounded-full p-2 text-slate-700 transition hover:bg-slate-100"
            aria-label="장바구니"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <path d="M7 7h10l1 10H6L7 7z" />
              <path d="M9 7V6a3 3 0 0 1 6 0v1" />
            </svg>
          </button>
          <div className="relative">
            <button
              type="button"
              className="rounded-full p-2 text-slate-700 transition hover:bg-slate-100"
              aria-label="내 정보"
              aria-haspopup="menu"
              aria-expanded={isAccountOpen}
              onClick={() => setIsAccountOpen((prev) => !prev)}
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4z" />
                <path d="M4 20a8 8 0 0 1 16 0" />
              </svg>
            </button>
            {isAccountOpen && (
              <div
                role="menu"
                className="absolute right-0 z-10 mt-2 w-32 rounded-xl border border-slate-200 bg-white p-2 text-sm text-slate-600 shadow-lg"
              >
                <button
                  type="button"
                  role="menuitem"
                  className="w-full rounded-lg px-3 py-2 text-left transition hover:bg-slate-100"
                >
                  로그인
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}
