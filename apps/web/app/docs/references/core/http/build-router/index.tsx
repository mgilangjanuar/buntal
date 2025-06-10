import ReferencePage from '@/components/docs/reference-page'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: 'buildRouter - Buntal JS'
  } satisfies MetaProps
}

export default function BuildRouterPage() {
  return (
    <ReferencePage
      headerTitle="@buntal/core - Http"
      title="buildRouter"
      description="Function that creates a file system router for Buntal applications using Bun's built-in router."
      sourceUrl="https://github.com/mgilangjanuar/buntal/blob/main/packages/%40buntal/core/http/router.ts"
      typeDefinition={`function buildRouter(dir: string): Bun.FileSystemRouter`}
      parameters={[
        {
          name: 'dir',
          type: 'string',
          required: true,
          description: 'Directory path containing route files'
        }
      ]}
      lastModified="2025-06-10"
    />
  )
}
