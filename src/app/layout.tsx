import '../styles/globals.css'
import { cookies } from 'next/headers'
import { Inter } from 'next/font/google'
import { THEME_KEY, Theme } from '@/data/theme'
import clsx from 'clsx'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'JokeGPT',
  description: 'Your number one source for original, ai-plagiarized humor!',
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
      <head>
        <title>{metadata.title}</title>

        {/* Basic meta tags */}
        <meta charSet="UTF-8" />
        <meta name="description" content={metadata.description} />
        <meta name="author" content="Menushka Weeratunga" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Open Graph protocol (OGP) meta tags - for social media previews */}
        <meta property="og:title" content={metadata.title} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://jokegpt.io" />
        <meta property="og:image" content="https://jokegpt.io/screenshot.png" />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:site_name" content={metadata.title} />

        {/* Twitter card meta tags */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@menushkaDev" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content="https://jokegpt.io/screenshot.png" />

        {/* Other important meta tags */}
        <link rel="canonical" href="https://jokegpt.io" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
