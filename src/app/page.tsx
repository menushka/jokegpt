import { metadata } from './layout'
import { Results } from '@/components/views/Results'
import { Github, Moon, Sun, Twitter } from 'lucide-react'
import { DarkModeSwitch } from '@/components/views/DarkModeSwitch'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-center items-center p-8">
      <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center'>{metadata.title}</h1>
      <h2 className='scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-center'>{metadata.description}</h2>
      <Results />
      <div className='absolute top-0 left-0 w-full flex justify-between items-center gap-4 p-4'>
        <div className='flex gap-2'>
          <Sun className='stroke-[hsl(var(--foreground))]' />
          <DarkModeSwitch />
          <Moon className='stroke-[hsl(var(--foreground))]' />
        </div>
        <Link
          className='w-10 h-10 rounded-full flex justify-center items-center cursor-pointer transition-transform hover:scale-110'
          href='https://github.com/menushka'
        >
          <Github className='stroke-[hsl(var(--foreground))]' />
        </Link>
      </div>
    </main>
  )
}
