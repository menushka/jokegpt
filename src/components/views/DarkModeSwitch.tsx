'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { setCookie, getCookie } from 'tiny-cookie'
import { Switch } from '@/components/ui/switch'
import { THEME_KEY, Theme } from '@/data/theme'

const DarkModeSwitch = () => {
  const [checked, setChecked] = useState(() => {
    if (typeof document === 'undefined') {
      return require('next/headers').cookies().get(THEME_KEY).value === Theme.Dark
    } else {
      return getCookie(THEME_KEY) === Theme.Dark
    }
  })

  const updateDarkMode = useCallback((isDarkMode: boolean) => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
      setCookie(THEME_KEY, Theme.Dark)
      setChecked(true)
    } else {
      document.documentElement.classList.remove('dark')
      setCookie(THEME_KEY, Theme.Light)
      setChecked(false)
    }
  }, [])

  // Set cookie if not set already
  useEffect(() => {
    const isCookieSetAlready = Object.values(Theme).includes(getCookie(THEME_KEY) as string)
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
