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
    />
  )
}
