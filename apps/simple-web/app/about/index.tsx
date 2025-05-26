export default function AboutPage() {
  return (
    <div>
      <h1>About Buntal</h1>
      <p>
        PORT: {process.env.BUNTAL_PUBLIC_PORT || 'Not set'}
      </p>
      <p>Buntal is a simple and powerful framework for building web applications.</p>
      <p>It is designed to be easy to use and flexible, allowing developers to create applications quickly and efficiently.</p>
    </div>
  )
}
