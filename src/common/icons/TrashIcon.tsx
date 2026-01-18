type IconProps = {
  className?: string
}

export default function TrashIcon({ className = '' }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M4 7h16" />
      <path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
      <path d="M8 7l1 12h6l1-12" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
    </svg>
  )
}
