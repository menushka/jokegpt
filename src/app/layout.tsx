import '../styles/globals.css'
import { cookies } from 'next/headers'
import { Inter } from 'next/font/google'
import { THEME_KEY, Theme } from '@/data/theme'
import clsx from 'clsx'
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

const title = 'JokeGPT'
const description = 'Your number one source for original, ai-plagiarized humor!'

export const metadata: Metadata = {
  title,
  description,
  keywords: ['Joke', 'GPT', 'AI'],
  authors: [{ name: 'Menushka Weeratunga', url: 'https://menushka.ca' }],
  metadataBase: new URL('https://jokegpt.io'),
  openGraph: {
    title,
    description,
    url: '/',
    siteName: 'JokeGPT',
    images: '/screenshot.png',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    creator: '@menushkaDev',
    images: '/screenshot.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = cookies()
  const isDarkMode = cookieStore.get(THEME_KEY)?.value === Theme.Dark
  return (
    <html lang="en" className={clsx(isDarkMode && 'dark')}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
