import { NavLink } from 'react-router-dom'

const linkBase =
  'px-3 py-2 text-sm uppercase tracking-wide transition-colors'

export default function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <NavLink to="/" className="text-lg font-semibold">
          nodeShop
        </NavLink>
        <div className="flex items-center gap-2">
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
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? 'text-slate-900' : 'text-slate-500'}`
            }
          >
            Cart
          </NavLink>
          <NavLink
            to="/order"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? 'text-slate-900' : 'text-slate-500'}`
            }
          >
            Order
          </NavLink>
        </div>
      </nav>
    </header>
  )
}
