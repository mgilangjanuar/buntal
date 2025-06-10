import ReferencePage from '@/components/docs/reference-page'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: 'logger - Buntal JS'
  } satisfies MetaProps
}

export default function LoggerPage() {
  return (
    <ReferencePage
      headerTitle="@buntal/core - Middleware"
      title="logger"
      description="HTTP request logging middleware for Buntal applications that logs request details."
      sourceUrl="https://github.com/mgilangjanuar/buntal/blob/main/packages/%40buntal/core/middlewares/logger.ts"
      typeDefinition={`function logger(): AtomicHandler`}
    />
  )
}
