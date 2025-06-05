'use client'

import { Svg } from 'buntal'
import { useState } from 'react'
import ContextMenu from './context-menu'

interface LogoWithContextMenuProps {
  src: string
  className?: string
  filename?: string
}

export default function LogoWithContextMenu({
  src,
  className,
  filename = 'buntal-logo.svg'
}: LogoWithContextMenuProps) {
  const [isCopied, setIsCopied] = useState(false)

  const downloadSvg = () => {
    // Create a blob with the SVG content
    const blob = new Blob([src], { type: 'image/svg+xml' })

    // Create a temporary URL for the blob
    const url = URL.createObjectURL(blob)

    // Create a temporary anchor element to trigger the download
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()

    // Clean up
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const copySvgToClipboard = async () => {
    navigator.clipboard.writeText(src)
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 2000)
  }

  const menuItems = [
    {
      label: 'Download SVG',
      onClick: downloadSvg,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
          <path d="M7 11l5 5l5 -5" />
          <path d="M12 4l0 12" />
        </svg>
      )
    },
    {
      label: 'Copy SVG Code',
      onClick: copySvgToClipboard,
      icon: isCopied ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M5 12l5 5l10 -10" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M8 8m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z" />
          <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" />
        </svg>
      )
    }
  ]

  return (
    <ContextMenu menuItems={menuItems}>
      <div className="cursor-pointer">
        <Svg src={src} className={className} />
      </div>
    </ContextMenu>
  )
}
