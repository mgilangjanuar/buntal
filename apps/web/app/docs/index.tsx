import Header from '@/components/docs/header'
import { Link, type MetaProps } from 'buntal'
import { useEffect, useRef, useState } from 'react'

export const $ = {
  _meta: {
    title: 'Get Started - Buntal JS'
  } satisfies MetaProps
}

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState<string>('')
  const [borderHeight, setBorderHeight] = useState<number>(0)
  const [borderTop, setBorderTop] = useState<number>(0)
  const asideRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      // Get all sections with IDs
      const sections = document.querySelectorAll('*[id]')

      let currentSection = ''
      let currentOffset = 0

      // Find the current section in viewport
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        const sectionId = section.getAttribute('id')

        if (sectionId && rect.top <= 150) {
          // 150px threshold for active section
          currentSection = sectionId
          // Try to find a link in aside that matches this section
          const matchingLink = asideRef.current?.querySelector(
            `a[href*="${sectionId}"]`
          )
          if (matchingLink) {
            const href = matchingLink.getAttribute('href')
            // Extract offset from href (number after ':')
            const offsetMatch = href ? href.match(/:(\d+)$/) : null
            currentOffset =
              offsetMatch && offsetMatch[1] ? parseInt(offsetMatch[1]) : 0
          }
        }
      })

      setActiveSection(currentSection)
      updateBorderPosition(currentSection, currentOffset)
    }

    const updateBorderPosition = (sectionId: string, offset: number) => {
      // Calculate border position and height
      if (sectionId && asideRef.current) {
        const activeLink = asideRef.current.querySelector(
          `a[href*="${sectionId}"]`
        ) as HTMLElement
        if (activeLink) {
          const linkRect = activeLink.getBoundingClientRect()
          const asideRect = asideRef.current.getBoundingClientRect()

          // Calculate position relative to aside
          const linkTop = linkRect.top - asideRect.top - 72
          const linkHeight = linkRect.height

          setBorderTop(linkTop + offset)
          setBorderHeight(linkHeight)
        }
      }
    }

    const handleResize = () => {
      // Recalculate border position on resize
      if (activeSection) {
        const matchingLink = asideRef.current?.querySelector(
          `a[href*="${activeSection}"]`
        )
        if (matchingLink) {
          const href = matchingLink.getAttribute('href')
          const offsetMatch = href ? href.match(/:(\d+)$/) : null
          const currentOffset =
            offsetMatch && offsetMatch[1] ? parseInt(offsetMatch[1]) : 0
          updateBorderPosition(activeSection, currentOffset)
        }
      }
    }

    // Initial call
    handleScroll()

    // Add event listeners
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize, { passive: true })

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [activeSection])

  return (
    <div>
      <Header title="Get Started" />
      <main className="grid gap-8 xl:grid-cols-[1fr_322px] py-4">
        <div className="container ml-0 prose pb-6 grid grid-cols-1">
          <div role="alert" className="alert alert-warning items-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>
              Warning: This is an early development stage, expect breaking
              changes and missing features.
            </span>
          </div>
          <img
            src="/banner.png"
            alt="Buntal JS banner"
            className="rounded-md w-full mb-0 mt-4"
          />
          <section id="introduction">
            <p>
              <strong className="font-serif">Buntal JS</strong> is a
              lightweight, modern JavaScript framework designed to simplify web
              development; with Next.js-like file system routing, type-safe
              APIs, and focus on performance by leveraging the{' '}
              <a
                href="https://bun.sh"
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-4"
              >
                Bun
              </a>{' '}
              ecosystem, the fastest runtime ever.
            </p>
            <h4 id="what-can-i-build">What can I build with Buntal JS?</h4>
            <p>
              Our goal is to be a simple web ecosystem, allowing you to build
              everything from simple static sites to complex web applications.
              Currently, you can create:
            </p>
            <ul>
              <li>HTTP servers</li>
              <li>Web applications</li>
            </ul>
            <h4 id="why-separate-http-server-and-full-stack-web-framework">
              Why separate the HTTP server and full-stack web framework?
            </h4>
            <p>
              Our principle is to keep things simple and modular. By separating
              the HTTP server from the full-stack web framework, you can build
              API gateways, microservices, or server-side applications without
              installing React and other unnecessary dependencies.
            </p>
            <p>
              On the other hand, if you want to build a full-stack web
              application, you don't need to worry about the HTTP server setup.
              Buntal JS will handle it for you, allowing you to focus on
              building your application.
            </p>
            <h4 id="does-it-production-ready">
              Is it production-ready? When will it be stable?
            </h4>
            <p>
              Buntal JS is unstable, <em>like all of us.</em> It is in the super
              early stages of development, and we are working hard to make it
              stable. Please keep an eye on the v1 release for the stable
              version.
            </p>
            <h4 id="how-to-pronounce-buntal">How to pronounce "Buntal"?</h4>
            <p>
              Buntal <span className="font-serif">/bʌnˈtɑːl/</span>
            </p>
            <ul>
              <li>
                <strong className="font-serif">ˈbʌn-</strong>: The 'u' sound as
                in "cut" or "strut." The stress mark (ˈ) indicates the primary
                stress on this syllable.
              </li>
              <li>
                <strong className="font-serif">-tɑːl</strong>: The 'a' sound as
                in "palm" or "father."
              </li>
            </ul>
          </section>
          <section id="features">
            <h2>Features</h2>
            <ul>
              <li>
                <strong>Blazing Fast:</strong> Built on Bun, the fastest
                JavaScript runtime.
              </li>
              <li>
                <strong>HTTP Server:</strong> Create type-safe API endpoints
                with Bun's native HTTP server.
              </li>
              <li>
                <strong>File-based Routing:</strong> Define routes using file
                structure, similar to Next.js.
              </li>
              <li>
                <strong>SPA:</strong> Single Page Application support with React
                and Bun's bundler.
              </li>
              <li>
                <strong>SSR:</strong> Server-side rendering for dynamic content.
              </li>
              <li>More to come!</li>
            </ul>
          </section>
          <section id="how-to-contribute">
            <h2>How to Contribute</h2>
            <p>
              We welcome contributions! Since we're in the early stages of
              development, you can learn how to build a web framework from
              scratch and help us build a better framework.
            </p>
            <p>To contribute, please follow these steps:</p>
            <ul>
              <li>
                Give us a star on the{' '}
                <a
                  href="https://github.com/mgilangjanuar/buntal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-offset-4"
                >
                  repository
                </a>
                .
              </li>
              <li>
                Create an issue for any bugs, feature requests, ideas, or
                improvements you have.
              </li>
              <li>
                If you want to contribute code, fork the repository and create a
                pull request with your changes.
              </li>
            </ul>
          </section>
          <p className="text-sm text-base-content/60 border-t border-base-content/10 pt-6 mt-12">
            Last modified: 2025-05-28
          </p>
        </div>
        <div className="xl:block hidden">
          <div className="sticky top-18">
            <aside
              ref={asideRef}
              className="container ml-0 text-base-content/60 text-sm space-y-2 relative"
              style={{
                borderLeft: '1px solid rgb(0 0 0 / 0.02)'
              }}
            >
              {/* Animated border indicator */}
              <div
                className="absolute left-0 w-[2px] bg-primary transition-all duration-300 ease-in-out"
                style={{
                  top: `${borderTop}px`,
                  height: `${borderHeight}px`,
                  opacity: activeSection ? 1 : 0
                }}
              />
              <ul className="pl-4 py-4 space-y-2">
                <li>
                  <Link
                    className="hover:text-base-content hover:underline underline-offset-4"
                    href="#introduction:72"
                  >
                    Introduction
                  </Link>
                  <ul className="pl-4 pt-2 space-y-2">
                    <li>
                      <Link
                        className="hover:text-base-content hover:underline underline-offset-4"
                        href="#what-can-i-build:72"
                      >
                        What can I build with Buntal JS?
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="hover:text-base-content hover:underline underline-offset-4"
                        href="#why-separate-http-server-and-full-stack-web-framework:72"
                      >
                        Why separate the HTTP server and full-stack web
                        framework?
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="hover:text-base-content hover:underline underline-offset-4"
                        href="#does-it-production-ready:72"
                      >
                        Is it production-ready? When will it be stable?
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="hover:text-base-content hover:underline underline-offset-4"
                        href="#how-to-pronounce-buntal:72"
                      >
                        How to pronounce "Buntal"?
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link
                    className="hover:text-base-content hover:underline underline-offset-4"
                    href="#features:72"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-base-content hover:underline underline-offset-4"
                    href="#how-to-contribute:72"
                  >
                    How to Contribute
                  </Link>
                </li>
              </ul>
            </aside>
          </div>
        </div>
      </main>
    </div>
  )
}
