/** Simple geometric mausoleum mark (dome + base) for nav/footer */
export function MausoleumIcon({ className = 'h-8 w-8' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M16 4C10.5 4 6 8.2 6 13v2h20v-2c0-4.8-4.5-9-10-9z"
        fill="currentColor"
        opacity={0.92}
      />
      <rect x="5" y="14" width="22" height="4" rx="1" fill="currentColor" opacity={0.88} />
      <path
        d="M4 18h24v10H4V18z"
        fill="currentColor"
        opacity={0.95}
      />
      <path
        d="M14 21h4v5h-4v-5z"
        fill="currentColor"
        opacity={0.45}
      />
      <rect x="7" y="22" width="3" height="4" rx="0.5" fill="currentColor" opacity={0.35} />
      <rect x="22" y="22" width="3" height="4" rx="0.5" fill="currentColor" opacity={0.35} />
    </svg>
  )
}
