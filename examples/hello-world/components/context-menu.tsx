'use client'

import { useEffect, useRef, useState } from 'react'

interface ContextMenuProps {
  children: React.ReactNode
  menuItems: Array<{
    label: string
    onClick: () => void
    icon?: React.ReactNode
  }>
}

export default function ContextMenu({ children, menuItems }: ContextMenuProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const menuRef = useRef<HTMLUListElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    setPosition({ x: e.clientX, y: e.clientY })
    setIsVisible(true)
  }

  const handleClick = () => {
    setIsVisible(false)
  }

  const handleMenuItemClick = (onClick: () => void) => {
    onClick()
    setIsVisible(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsVisible(false)
      }
    }

    const handleScroll = () => {
      setIsVisible(false)
    }

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('scroll', handleScroll)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('scroll', handleScroll)
    }
  }, [isVisible])

  // Adjust menu position to prevent overflow
  useEffect(() => {
    if (isVisible && menuRef.current) {
      const menu = menuRef.current
      const menuRect = menu.getBoundingClientRect()
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      let newX = position.x
      let newY = position.y

      // Adjust horizontal position if menu overflows right edge
      if (position.x + menuRect.width > viewportWidth) {
        newX = position.x - menuRect.width
      }

      // Adjust vertical position if menu overflows bottom edge
      if (position.y + menuRect.height > viewportHeight) {
        newY = position.y - menuRect.height
      }

      // Ensure menu doesn't go off the left or top edge
      newX = Math.max(0, newX)
      newY = Math.max(0, newY)

      if (newX !== position.x || newY !== position.y) {
        setPosition({ x: newX, y: newY })
      }
    }
  }, [isVisible, position])

  return (
    <div ref={containerRef} className="relative">
      <div onContextMenu={handleContextMenu} onClick={handleClick}>
        {children}
      </div>

      {isVisible && (
        <>
          <div className="fixed inset-0 z-40" />
          <ul
            ref={menuRef}
            className="menu bg-base-200 rounded-box w-56 shadow-lg border border-base-300 fixed z-50"
            style={{
              left: `${position.x}px`,
              top: `${position.y}px`
            }}
          >
            {menuItems.map((item, index) => (
              <li key={index}>
                <button
                  className="flex items-center gap-2 px-4 py-2 hover:bg-base-300 transition-colors"
                  onClick={() => handleMenuItemClick(item.onClick)}
                >
                  {item.icon && <span className="w-4 h-4">{item.icon}</span>}
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
