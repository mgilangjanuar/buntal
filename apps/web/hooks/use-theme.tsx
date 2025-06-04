import { createContext, useContext, useEffect, useState } from 'react'

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

export function ThemeProvider({
  defaultTheme,
  themesMap = { light: 'light', dark: 'dark' },
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
    }
  }, [theme])

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        themesMap
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
