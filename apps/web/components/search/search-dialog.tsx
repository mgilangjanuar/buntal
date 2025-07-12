'use client'

import { Command } from 'cmdk'
import { useRouter } from 'buntal'
import { useEffect, useState, useMemo } from 'react'
import { searchIndex, type SearchItem } from '@/lib/search-index'
import Fuse from 'fuse.js'
import { useSearch } from '@/hooks/use-search'

interface SearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SearchDialogWrapper() {
  const { isOpen, close } = useSearch()
  return <SearchDialog open={isOpen} onOpenChange={close} />
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [search, setSearch] = useState('')
  const [filteredItems, setFilteredItems] = useState<SearchItem[]>([])
  const router = useRouter()

  // Configure Fuse.js for fuzzy search
  const fuse = useMemo(() => {
    const options = {
      keys: [
        { name: 'title', weight: 0.3 },
        { name: 'description', weight: 0.2 },
        { name: 'content', weight: 0.2 },
        { name: 'keywords', weight: 0.2 },
        { name: 'breadcrumb', weight: 0.1 }
      ],
      threshold: 0.6, // More lenient matching (0 = exact, 1 = match anything)
      distance: 200,
      minMatchCharLength: 1,
      includeScore: true,
      ignoreLocation: true // Don't consider position of match in string
    }
    return new Fuse(searchIndex, options)
  }, [])

  // Filter items based on search input using fuzzy search
  useEffect(() => {
    if (!search || search.length < 2) {
      setFilteredItems(searchIndex.slice(0, 8)) // Show first 8 items by default
      return
    }

    const results = fuse.search(search, { limit: 12 })
    const filtered = results.map((result) => result.item)

    setFilteredItems(filtered)
  }, [search, fuse])

  const handleSelect = (item: SearchItem) => {
    onOpenChange(false)
    setSearch('')
    router.push(item.url)
  }

  const groupedItems = filteredItems.reduce(
    (groups, item) => {
      const key = item.type === 'docs' ? 'Documentation' : 'API Reference'
      if (!groups[key]) groups[key] = []
      groups[key].push(item)
      return groups
    },
    {} as Record<string, SearchItem[]>
  )

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-dialog-title"
    >
      <div className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-[calc(100%-2rem)] max-w-lg">
        <Command className="rounded-box border border-base-content/10 bg-base-100 shadow-xl overflow-hidden">
          <div
            id="search-dialog-title"
            className="flex items-center border-b border-base-content/10 px-3"
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
              className="mr-2 h-4 w-4 shrink-0 opacity-50"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <Command.Input
              value={search}
              onValueChange={setSearch}
              placeholder="Search documentation..."
              autoFocus
              className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-base-content/50 disabled:cursor-not-allowed disabled:opacity-50 min-w-0"
            />
            <kbd className="pointer-events-none ml-auto hidden h-5 select-none items-center gap-1 rounded border border-base-content/20 bg-base-200 px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
              <span className="text-xs">ESC</span>
            </kbd>
          </div>
          <Command.List className="max-h-[400px] overflow-y-auto p-3">
            <Command.Empty className="py-6 text-center text-sm text-base-content/60">
              No results found.
            </Command.Empty>

            {Object.entries(groupedItems).map(([groupName, items]) => (
              <Command.Group key={groupName} heading={groupName}>
                {items.map((item) => (
                  <Command.Item
                    key={item.id}
                    value={`${item.title} ${item.description} ${item.keywords.join(' ')}`}
                    onSelect={() => handleSelect(item)}
                    className="cursor-pointer rounded-md my-2 px-2 py-3 text-sm aria-selected:bg-primary/10 aria-selected:text-primary flex flex-col items-start gap-1"
                  >
                    <div className="flex w-full items-center justify-between min-w-0">
                      <span className="font-medium truncate flex-1 mr-2">
                        {item.title}
                      </span>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <span className="rounded bg-base-200 px-1.5 py-0.5 text-xs text-base-content/60">
                          {item.category}
                        </span>
                      </div>
                    </div>
                    <div className="text-xs text-base-content/60 truncate w-full">
                      {item.description}
                    </div>
                  </Command.Item>
                ))}
              </Command.Group>
            ))}
          </Command.List>
        </Command>
      </div>
    </div>
  )
}
