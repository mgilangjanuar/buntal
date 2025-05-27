import Logo from '@/logo.svg' with { type: 'text' }
import { Svg } from 'buntal'

export default function HomePage() {
  return <div className="min-h-svh flex flex-col items-center justify-center container mx-auto">
    <div className="space-y-4">
      <Svg src={Logo} className="[&>*]:size-28" />
      <h1 className="text-4xl font-bold">Next.js who?</h1>
      <p className="text-base leading-7">
        Run{' '}
        <code className="relative rounded bg-gray-100 px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
          rm -rf ./
        </code> if you accidentally created a{' '}
        <a href="https://buntaljs.org" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:cursor-pointer">
          Buntal
        </a> app.
      </p>
    </div>
  </div>
}
