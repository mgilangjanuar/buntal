import { createContext, use, useEffect, useMemo, useState } from 'react'

type Theme = {
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
  themesMap: { [key in 'light' | 'dark']: string }
}

const ThemeContext = createContext<Theme>({
  theme: 'light',
  setTheme: () => {},
  themesMap: {
    light: 'light',
    dark: 'dark'
  }
})

type ThemeProviderProps = {
  defaultTheme?: 'light' | 'dark'
  themesMap?: { [key in 'light' | 'dark']: string }
  children?: React.ReactNode
}

const defaultThemesMap = { light: 'light', dark: 'dark' }

export function ThemeProvider({
  defaultTheme,
  themesMap = defaultThemesMap,
  children
}: ThemeProviderProps) {
  if (typeof window === 'undefined') {
    return children
  }

  const [theme, setTheme] = useState<'light' | 'dark'>(
    (window.localStorage.getItem('theme') as typeof defaultTheme) ||
      defaultTheme ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light')
  )

  useEffect(() => {
    if (theme && window.localStorage.getItem('theme') !== theme) {
      window.localStorage.setItem('theme', theme)
    }
  }, [theme])

  useEffect(() => {
    if (theme) {
      document.body.setAttribute('data-theme', themesMap[theme])
      document.body.style.visibility = 'visible'
    }
  }, [theme])

  const contextValue = useMemo(
    () => ({
      theme,
      setTheme,
      themesMap
    }),
    [theme, setTheme, themesMap]
  )

  return <ThemeContext value={contextValue}>{children}</ThemeContext>
}

export const useTheme = () => use(ThemeContext)
