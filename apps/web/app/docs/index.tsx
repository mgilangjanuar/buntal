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

#### Is it production-ready?

Yes. Since v1.0.0 Buntal JS is stable and follows [semantic versioning](https://semver.org): breaking changes only land in a new major version. Pre-releases are published under the \`next\` tag on npm.

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

We welcome contributions! You can learn how to build a web framework from scratch and help us build a better framework.

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
              id: 'is-it-production-ready-',
              title: 'Is it production-ready?',
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
        <div className="max-w-prose">
          <div className="my-8">
            <img
              src="/banner.png?v=1"
              loading="lazy"
              alt="banner"
              className="my-0! rounded-lg"
            />
          </div>
        </div>
      }
      lastModified="2025-05-28"
    />
  )
}
