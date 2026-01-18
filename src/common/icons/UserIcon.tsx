type IconProps = {
  className?: string
}

export default function UserIcon({ className = '' }: IconProps) {
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
      <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4z" />
      <path d="M4 20a8 8 0 0 1 16 0" />
    </svg>
  )
}
