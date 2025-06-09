import MarkdownContent from '@/components/docs/markdown-content'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: 'SvgProps - Buntal JS'
  } satisfies MetaProps
}

export default function SvgPropsPage() {
  return (
    <MarkdownContent
      title="SvgProps"
      content={`# SvgProps

Type definition for Svg component properties.

## Type Definition

SvgProps are passed to the Svg component but not exported as a separate type.

\`\`\`typescript
export { Svg } from 'buntal'
\`\`\`

\`\`\`typescript
type SvgProps = {
  src: string
  className?: string
}
\`\`\`

## Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| \`src\` | \`string\` | ✅ | SVG source content as string |
| \`className\` | \`string\` | ❌ | CSS classes to apply to the SVG element |

## Usage

\`\`\`typescript
import { Svg } from 'buntal'
import LogoIcon from './logo.svg' with { type: 'text' }
import UserIcon from './icons/user.svg' with { type: 'text' }

// Basic SVG
function Logo() {
  return (
    <Svg src={LogoIcon} />
  )
}

// SVG with styling
function StyledIcon() {
  return (
    <Svg
      src={UserIcon}
      className="w-6 h-6 text-blue-500"
    />
  )
}

// Multiple SVGs in navigation
function Navigation() {
  return (
    <nav className="flex space-x-4">
      <button className="flex items-center space-x-2">
        <Svg src={UserIcon} className="w-4 h-4" />
        <span>Profile</span>
      </button>
      <button className="flex items-center space-x-2">
        <Svg src={SettingsIcon} className="w-4 h-4" />
        <span>Settings</span>
      </button>
    </nav>
  )
}

// Dynamic SVG content
function DynamicIcon({ iconContent }: { iconContent: string }) {
  return (
    <Svg
      src={iconContent}
      className="w-8 h-8 transition-colors hover:text-blue-600"
    />
  )
}
\`\`\`

## Import Syntax

To use SVG files with the Svg component, import them with the \`with { type: 'text' }\` syntax:

\`\`\`typescript
// Correct way to import SVG content
import MyIcon from './my-icon.svg' with { type: 'text' }

// Use in component
<Svg src={MyIcon} className="w-6 h-6" />
\`\`\`

## Styling

The Svg component renders the SVG content inline, allowing for CSS styling:

\`\`\`css
/* Target SVG elements */
.icon svg {
  width: 24px;
  height: 24px;
  fill: currentColor;
}

/* Responsive sizing */
.responsive-icon svg {
  width: 100%;
  height: auto;
}

/* Animation */
.animated-icon svg {
  transition: transform 0.2s ease;
}

.animated-icon:hover svg {
  transform: scale(1.1);
}
\`\`\`

## Related Types

- [Svg Component](/docs/references/buntal#svg) - Component that uses SvgProps
- [LinkProps](/docs/references/link-props) - For creating links with icons`}
      tableOfContents={[
        {
          id: 'type-definition',
          title: 'Type Definition',
          level: 1,
          offset: 72
        },
        {
          id: 'properties',
          title: 'Properties',
          level: 1,
          offset: 72
        },
        {
          id: 'usage',
          title: 'Usage',
          level: 1,
          offset: 72
        },
        {
          id: 'import-syntax',
          title: 'Import Syntax',
          level: 1,
          offset: 72
        },
        {
          id: 'styling',
          title: 'Styling',
          level: 1,
          offset: 72
        }
      ]}
      lastModified="2025-06-09"
    />
  )
}
