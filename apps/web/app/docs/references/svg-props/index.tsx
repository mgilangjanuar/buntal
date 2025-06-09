import ReferencePage from '@/components/docs/reference-page'

export default function SvgPropsReference() {
  return (
    <ReferencePage
      title="SvgProps"
      description="Properties interface for SVG components in Buntal, extending standard SVG element attributes with additional functionality."
      sourceUrl="https://github.com/mgilangjanuar/buntal/blob/main/packages/@buntal/core/components/svg.tsx"
      typeDefinition={`interface SvgProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  color?: string;
  title?: string;
  children?: React.ReactNode;
}`}
      properties={[
        {
          name: 'size',
          type: 'number | string',
          required: false,
          description:
            'Sets both width and height of the SVG. Can be a number (pixels) or string with units'
        },
        {
          name: 'color',
          type: 'string',
          required: false,
          description:
            'Sets the fill color of the SVG. Accepts any valid CSS color value'
        },
        {
          name: 'title',
          type: 'string',
          required: false,
          description: 'Accessible title for the SVG, used for screen readers'
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          required: false,
          description:
            'SVG elements and paths to render inside the SVG container'
        }
      ]}
      examples={[
        {
          title: 'Basic Icon Component',
          code: `import { Svg } from '@buntal/core';

export function HomeIcon({ size = 24, color = 'currentColor' }: SvgProps) {
  return (
    <Svg size={size} color={color} viewBox="0 0 24 24" title="Home">
      <path d="M12 2l10 9h-3v8h-5v-6h-4v6h-5v-8h-3z" />
    </Svg>
  );
}

// Usage
export default function Navigation() {
  return (
    <nav>
      <HomeIcon size={32} color="#3b82f6" />
      <span>Home</span>
    </nav>
  );
}`
        },
        {
          title: 'Responsive SVG',
          code: `import { Svg } from '@buntal/core';

export function Logo() {
  return (
    <Svg
      size="100%"
      viewBox="0 0 200 60"
      className="max-w-xs"
      title="Company Logo"
    >
      <rect width="200" height="60" fill="#1e40af" rx="8" />
      <text x="100" y="35" textAnchor="middle" fill="white" fontSize="24">
        LOGO
      </text>
    </Svg>
  );
}`
        },
        {
          title: 'Animated SVG Icon',
          code: `import { Svg } from '@buntal/core';

export function LoadingSpinner({ size = 24 }: { size?: number }) {
  return (
    <Svg
      size={size}
      viewBox="0 0 24 24"
      className="animate-spin"
      title="Loading"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
        strokeDasharray="31.416"
        strokeDashoffset="31.416"
        className="animate-pulse"
      />
      <path
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </Svg>
  );
}`
        }
      ]}
    />
  )
}
