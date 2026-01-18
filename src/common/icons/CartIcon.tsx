type IconProps = {
  className?: string
}

export default function CartIcon({ className = '' }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      width="30"
      height="30"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M7 7h10l1 10H6L7 7z" />
      <path d="M9 7V6a3 3 0 0 1 6 0v1" />
    </svg>
  )
}
