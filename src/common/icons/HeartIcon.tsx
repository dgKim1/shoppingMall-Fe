type IconProps = {
  className?: string
}

export default function HeartIcon({ className = '' }: IconProps) {
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
      <path d="M12 20s-6-4.3-8.5-7.6C1.6 10.3 2.1 7.5 4 6a4.5 4.5 0 0 1 6 1.1L12 9l2-1.9A4.5 4.5 0 0 1 20 6c1.9 1.5 2.4 4.3.5 6.4C18 15.7 12 20 12 20z" />
    </svg>
  )
}
