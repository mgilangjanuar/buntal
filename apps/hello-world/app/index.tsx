import Logo from '@/logo.svg' with { type: 'text' }
import { Svg } from 'buntal'

export default function HomePage() {
  return <div className="min-h-svh flex flex-col items-center justify-center">
    <div className="container mx-auto w-fit space-y-4">
      <Svg src={Logo} className="[&>svg]:size-28" />
      <h1 className="text-4xl font-bold">Hello, Buntal!</h1>
      <p className="text-lg mb-8">This is a simple Bun app using Buntal.</p>
    </div>
  </div>
}
