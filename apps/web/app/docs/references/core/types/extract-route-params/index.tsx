import ReferencePage from '@/components/docs/reference-page'

export default function ExtractRouteParamsReference() {
  return (
    <ReferencePage
      headerTitle="@buntal/core - Types"
      title="ExtractRouteParams"
      description="A utility type that extracts route parameters from a URL path string, converting path segments like ':id' into typed properties."
      sourceUrl="https://github.com/mgilangjanuar/buntal/blob/main/packages/@buntal/core/http/router.ts"
      typeDefinition={`type ExtractRouteParams<T extends string> =
  T extends \`\${string}:\${infer Param}/\${infer Rest}\`
    ? { [K in Param]: string } & ExtractRouteParams<Rest>
    : T extends \`\${string}:\${infer Param}\`
    ? { [K in Param]: string }
    : {};`}
      parameters={[
        {
          name: 'T',
          type: 'string',
          required: true,
          description:
            "The URL path string template containing parameter placeholders like ':id', ':name', etc."
        }
      ]}
      lastModified="2025-06-10"
    />
  )
}
