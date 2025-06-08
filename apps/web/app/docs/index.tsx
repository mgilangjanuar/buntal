import MarkdownContent from '@/components/docs/markdown-content'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: 'Get Started - Buntal JS'
  } satisfies MetaProps
}

export default function DocsPage() {
  return (
    <MarkdownContent
      title="Get Started"
      content={`## Introduction

**Buntal JS** is a lightweight, modern JavaScript framework designed to simplify web development; with Next.js-like file system routing, type-safe APIs, and focus on performance by leveraging the [Bun](https://bun.sh) ecosystem, the fastest runtime ever.

#### What can I build with Buntal JS?

Our goal is to be a simple web ecosystem, allowing you to build everything from simple static sites to complex web applications. Currently, you can create:

- HTTP servers
- Web applications

#### Why separate the HTTP server and full-stack web framework?

Our principle is to keep things simple and modular. By separating the HTTP server from the full-stack web framework, you can build API gateways, microservices, or server-side applications without installing React and other unnecessary dependencies.

On the other hand, if you want to build a full-stack web application, you don't need to worry about the HTTP server setup. Buntal JS will handle it for you, allowing you to focus on building your application.

#### Is it production-ready? When will it be stable?

Buntal JS is unstable, *like all of us.* It is in the super early stages of development, and we are working hard to make it stable. Please keep an eye on the v1 release for the stable version.

#### How to pronounce "Buntal"?

Buntal */bʌnˈtɑːl/*

- **ˈbʌn-**: The 'u' sound as in "cut" or "strut." The stress mark (ˈ) indicates the primary stress on this syllable.
- **-tɑːl**: The 'a' sound as in "palm" or "father."

## Features

- **Blazing Fast:** Built on Bun, the fastest JavaScript runtime.
- **HTTP Server:** Create type-safe API endpoints with Bun's native HTTP server.
- **File-based Routing:** Define routes using file structure, similar to Next.js.
- **SPA:** Single Page Application support with React and Bun's bundler.
- **SSR:** Server-side rendering for dynamic content.
- More to come!

## How to Contribute

We welcome contributions! Since we're in the early stages of development, you can learn how to build a web framework from scratch and help us build a better framework.

To contribute, please follow these steps:

- Give us a star on the [repository](https://github.com/mgilangjanuar/buntal).
- Create an issue for any bugs, feature requests, ideas, or improvements you have.
- If you want to contribute code, fork the repository and create a pull request with your changes.
`}
      tableOfContents={[
        {
          id: 'introduction',
          title: 'Introduction',
          level: 1,
          offset: 72,
          children: [
            {
              id: 'what-can-i-build-with-buntal-js-',
              title: 'What can I build with Buntal JS?',
              level: 2,
              offset: 72
            },
            {
              id: 'why-separate-the-http-server-and-full-stack-web-framework-',
              title:
                'Why separate the HTTP server and full-stack web framework?',
              level: 2,
              offset: 72
            },
            {
              id: 'is-it-production-ready-when-will-it-be-stable-',
              title: 'Is it production-ready? When will it be stable?',
              level: 2,
              offset: 72
            },
            {
              id: 'how-to-pronounce-buntal-',
              title: 'How to pronounce "Buntal"?',
              level: 2,
              offset: 72
            }
          ]
        },
        {
          id: 'features',
          title: 'Features',
          level: 1,
          offset: 72
        },
        {
          id: 'how-to-contribute',
          title: 'How to Contribute',
          level: 1,
          offset: 72
        }
      ]}
      prependComponent={
        <div>
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
          <div className="mt-8">
            <img src="/banner.png" alt="banner" className="!my-0 rounded-lg" />
          </div>
        </div>
      }
      lastModified="2025-05-28"
    />
  )
}
