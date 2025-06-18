export default function Blog() {
  return (
    <div className="container mx-auto prose prose-lg max-w-4xl py-8">
      <h1>Buntal Blog Example</h1>
      <p>
        This blog demonstrates how to load and render MDX content in Buntal
        using Bun's recommended approaches for both runtime and compile-time
        loading.
      </p>

      <h2>Available Posts</h2>
      <div className="not-prose">
        <div className="grid gap-4 my-6">
          <a
            href="/blog/example-post"
            className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <h3 className="font-semibold text-lg">
              Getting Started with Buntal and MDX
            </h3>
            <p className="text-gray-600">
              Learn how to build a blog with Buntal framework and MDX for
              content management.
            </p>
            <time className="text-sm text-gray-500">June 18, 2025</time>
          </a>

          <a
            href="/blog/static-example"
            className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <h3 className="font-semibold text-lg">
              Static Example (Compile-time)
            </h3>
            <p className="text-gray-600">
              Example showing compile-time MDX loading using Bun macros.
            </p>
            <time className="text-sm text-gray-500">June 18, 2025</time>
          </a>
        </div>
      </div>

      <h2>Implementation</h2>
      <p>
        Check out the <code>MDX_README.md</code> file for detailed
        implementation instructions and examples of both runtime and
        compile-time MDX loading approaches.
      </p>
    </div>
  )
}
