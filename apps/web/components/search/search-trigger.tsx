'use client'

import { useSearch } from '@/hooks/use-search'

interface SearchTriggerProps {
  variant?: 'button' | 'input'
  className?: string
}

export default function SearchTrigger({
  variant = 'button',
  className = ''
}: SearchTriggerProps) {
  const { open } = useSearch()

  if (variant === 'input') {
    return (
      <button
        onClick={open}
        className={`flex items-center w-full max-w-sm px-3 py-2 text-sm text-left bg-base-200 border border-base-content/10 rounded-md hover:bg-base-300 transition-colors ${className}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 opacity-50"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <span className="text-base-content/60 truncate flex-1 min-w-0">
          Search documentation...
        </span>
        <kbd className="pointer-events-none ml-auto hidden h-5 select-none items-center gap-1 rounded border border-base-content/20 bg-base-100 px-1.5 font-mono text-[10px] font-medium sm:flex flex-shrink-0">
          <span className="text-xs">⌘K</span>
        </kbd>
      </button>
    )
  }

  return (
    <button
      onClick={open}
      className={cn('btn btn-square btn-sm btn-ghost opacity-60 hover:opacity-100', className)}
      title="Search documentation (⌘K)"
      aria-label="Search documentation (⌘K)"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    </button>
  )
}
