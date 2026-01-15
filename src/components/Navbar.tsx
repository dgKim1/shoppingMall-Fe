import { NavLink } from 'react-router-dom'
import { Button, Dropdown } from '../common'

const linkBase =
  'px-3 py-2 text-sm uppercase tracking-wide transition-colors'

export default function Navbar() {
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
