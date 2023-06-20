import '../styles/globals.css'
import { cookies } from 'next/headers'
import { Inter } from 'next/font/google'
import { THEME_KEY, Theme } from '@/data/theme'
import clsx from 'clsx'

const inter = Inter({ subsets: ['latin'] })

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
