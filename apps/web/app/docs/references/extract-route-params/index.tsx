import ReferencePage from '@/components/docs/reference-page'

export default function ExtractRouteParamsReference() {
  return (
    <ReferencePage
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
      examples={[
        {
          title: 'Basic Route Parameter Extraction',
          code: `// For route '/users/:id'
type UserRouteParams = ExtractRouteParams<'/users/:id'>;
// Result: { id: string }

// For route '/posts/:postId/comments/:commentId'
type PostCommentParams = ExtractRouteParams<'/posts/:postId/comments/:commentId'>;
// Result: { postId: string; commentId: string }

// Usage in route handler
http.get('/users/:id', (req: Req<ExtractRouteParams<'/users/:id'>>) => {
  const { id } = req.params; // TypeScript knows 'id' exists and is a string
  return \`User ID: \${id}\`;
});`
        },
        {
          title: 'Multiple Parameters',
          code: `// Complex route with multiple parameters
type ApiRouteParams = ExtractRouteParams<'/api/v1/users/:userId/posts/:postId/edit'>;
// Result: { userId: string; postId: string }

// No parameters
type StaticRouteParams = ExtractRouteParams<'/about/contact'>;
// Result: {}`
        }
      ]}
    />
  )
}
