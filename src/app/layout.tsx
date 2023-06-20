import '../styles/globals.css'
import { cookies } from 'next/headers'
import { Inter } from 'next/font/google'
import { THEME_KEY, Theme } from '@/data/theme'
import clsx from 'clsx'
import type { Metadata } from 'next'
import { site } from '@/config/site'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: site.name,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: ['Joke', 'GPT', 'AI'],
  authors: [
    {
      name: "Menushka Weeratunga",
      url: "https://menushka.ca",
    },
  ],
  creator: "Menushka Weeratunga",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    title: site.name,
    description: site.description,
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
    images: [`${site.url}/og.jpg`],
    creator: "@menushkaDev",
  },
  icons: {
    icon: "/favicon.ico",
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
      <head />
      <body className={inter.className}>{children}</body>
    </html>
  )
}
