'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Switch } from '@/components/ui/switch'
import { THEME_KEY, Theme } from '@/data/theme'
import Cookies from 'next-cookie-everywhere'

const DarkModeSwitch = () => {
  const [checked, setChecked] = useState(Cookies.get(THEME_KEY) === Theme.Dark)

  const updateDarkMode = useCallback((isDarkMode: boolean) => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
      Cookies.set(THEME_KEY, Theme.Dark)
      setChecked(true)
    } else {
      document.documentElement.classList.remove('dark')
      Cookies.set(THEME_KEY, Theme.Light)
      setChecked(false)
    }
  }, [])

  // Set cookie if not set already
  useEffect(() => {
    const isCookieSetAlready = Object.values(Theme).includes(Cookies.get(THEME_KEY) as string)
    if (isCookieSetAlready) return
  
    const isDarkMode = window?.matchMedia?.('(prefers-color-scheme: dark)').matches
    updateDarkMode(isDarkMode)
  }, [updateDarkMode])

  return (
    <Switch
      checked={checked}
      onCheckedChange={updateDarkMode}
    />
  )
}

export { DarkModeSwitch }
