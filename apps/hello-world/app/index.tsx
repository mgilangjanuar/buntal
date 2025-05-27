import Logo from '@/logo.svg' with { type: 'text' }
import { Svg } from 'buntal'

export default function HomePage() {
  return <div className="min-h-svh flex flex-col items-center justify-center container mx-auto">
    <div className="space-y-4">
      <Svg src={Logo} className="[&>svg]:size-28" />
      <h1 className="text-4xl font-bold">Next.js who?</h1>
      <p className="text-lg">This is a simple Bun app using Buntal.</p>
    </div>
  </div>
}
