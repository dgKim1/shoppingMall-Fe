import { useEffect, useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Button, CartIcon, Dropdown, HeartIcon, UserIcon } from '../common'
import { linkBase, MEGA_MENU } from '../const/NavBar/const'
import { buildCategoryQuery } from '../utils/query'
import useLogout from '../hooks/auth/useLogout'
import useGetCartItems from '../hooks/cart/useGetCartItems'
import { useAuth } from '../context/AuthContext'
import './style.css'
export type MegaMenuKey = keyof typeof MEGA_MENU
export default function Navbar() {
  const headerRef = useRef<HTMLElement>(null)
  const lastScrollY = useRef(0)
  const [isVisible, setIsVisible] = useState(true)
  const [offset, setOffset] = useState(0)
  const [activeMenu, setActiveMenu] = useState<MegaMenuKey | null>(null)
  const { token, user, clearAuth } = useAuth()
  const [searchValue, setSearchValue] = useState('')
  const navigate = useNavigate()
  const isLogIn = Boolean(token)
  const { data: cartResponse } = useGetCartItems({
    enabled: isLogIn,
    userId: user?._id,
  })
  const cartItems = cartResponse?.data ?? []
  const cartCount = cartItems.length
  const logoutMutation = useLogout({
    onSuccess: () => {
      clearAuth()
      navigate('/login')
    },
    onError: () => {
      clearAuth()
      navigate('/login')
    },
  })

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
      className={`fixed flex items-center h-[100px] left-0 right-0 top-0 z-40 border-b border-slate-200 bg-white transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
      onMouseLeave={() => setActiveMenu(null)}
    >
      <nav className=" flex mx-[60px] w-full items-center gap-6 px-6 py-4">
        <NavLink to="/" className="text-2xl font-semibold">
          SelectLife
        </NavLink>
        <div className="Navbar-Menu hidden flex-1 items-center justify-center gap-2 md:flex">
          {(['New','Men', 'Women', 'Kids'] as MegaMenuKey[]).map((menuKey) => (
            <div
              key={menuKey}
              className="relative flex"
              onMouseEnter={() => setActiveMenu(menuKey)}
            >
              <NavLink
                to={`/${menuKey}`}
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? 'text-slate-900' : 'text-slate-500'}`
                }
              >
                {menuKey}
              </NavLink>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <form
            className="flex text-xl items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600"
            onSubmit={(event) => {
              event.preventDefault()
              const keyword = searchValue.trim()
              const params = new URLSearchParams()
              if (keyword) {
                params.set('name', keyword)
                navigate(`/?${params.toString()}`)
              } else {
                navigate('/')
              }
            }}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-[30px] w-[30px] shrink-0 stroke-slate-500"
              width="30"
              height="30"
              fill="none"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" />
            </svg>
            <input
              type="text"
              placeholder="검색"
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              className="w-28 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-500 sm:w-36"
            />
          </form>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="relative h-9 w-9 rounded-full p-0"
            aria-label="찜"
            onClick={() => navigate('/wishList')}
          >
            <HeartIcon className="h-[30px] w-[30px] shrink-0" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="relative h-9 w-9 rounded-full p-0"
            aria-label="장바구니"
            onClick={() => navigate('/cart')}
          >
            <CartIcon className="h-[30px] w-[30px] shrink-0" />
            {cartCount > 0 && (
              <span className="absolute right-[1px] top-[4px] z-30 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-slate-900 px-1 text-[10px] font-semibold text-white">
                {cartCount}
              </span>
            )}
          </Button>
          <Dropdown
            items={
              isLogIn
                ? [
                    {
                      label: '로그아웃',
                      onSelect: () => {
                        logoutMutation.mutate()
                      },
                    },
                  ]
                : [
                    {
                      label: '로그인',
                      onSelect: () => {
                        navigate('/login')
                      },
                    },
                  ]
            }
            trigger={({ buttonProps }) => (
              <Button
                {...buttonProps}
                variant="ghost"
                size="sm"
                className="h-9 w-9 rounded-full p-0"
                aria-label="내 정보"
              >
                <UserIcon className="h-[30px] w-[30px] shrink-0" />
              </Button>
            )}
          />
        </div>
      </nav>
      {/* MegaMenu 영역 */}
      <div
        className={`fixed left-0 right-0 z-30 border-t border-slate-200 bg-white px-12 py-8 transition duration-200 ${
          activeMenu
            ? 'pointer-events-auto opacity-100 visible'
            : 'pointer-events-none opacity-0 invisible'
        }`}
        style={{ top: 'var(--navbar-offset, 0px)' }}
        onMouseEnter={() => {
          if (activeMenu) {
            setActiveMenu(activeMenu)
          }
        }}
        onMouseLeave={() => setActiveMenu(null)}
      >
        {activeMenu && (
          <div className="grid w-fit grid-cols-[repeat(3,max-content)] gap-10 text-sm text-slate-600">
            {MEGA_MENU[activeMenu].map((section) => (
              <div key={section.title} className="space-y-3">
                <p className="text-l font-bold uppercase tracking-[0.2em] text-slate-800">
                  {section.title}
                </p>
                <div className="grid gap-2">
                  {section.items.map((item) => (
                    <button
                      key={item}
                      type="button"
                      className="text-left text-sm text-slate-700 transition hover:text-slate-900 hover:font-bold"
                      onClick={() => {
                        const query = buildCategoryQuery({
                          categoryMain: section.title,
                          categorySub: item,
                          personType: activeMenu
                        })
                        navigate(`/${activeMenu ?? ''}?${query}`)
                        setActiveMenu(null)
                      }}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}
