import { createContext, useContext, useEffect, useState } from 'react'

type Theme = {
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
  themesMap: { [key in 'light' | 'dark']: string }
  userPrefersDark: boolean
  defaultTheme: 'light' | 'dark'
}

const ThemeContext = createContext<Theme>({
  theme: 'light',
  setTheme: () => {},
  themesMap: {
    light: 'light',
    dark: 'dark'
  },
  userPrefersDark: false,
  defaultTheme: 'light'
})

type ThemeProviderProps = {
  defaultTheme?: 'light' | 'dark'
  themesMap: { [key in 'light' | 'dark']: string }
  children?: React.ReactNode
}

export function ThemeProvider({
  defaultTheme = 'light',
  themesMap,
  children,
  ...props
}: ThemeProviderProps) {
  const [userPrefersDark, setUserPrefersDark] = useState<boolean>(false)
  const [theme, setTheme] = useState<'light' | 'dark'>()

  useEffect(() => {
    setUserPrefersDark(
      window.matchMedia('(prefers-color-scheme: dark)').matches
    )
  }, [])

  useEffect(() => {
    setTheme(
      (window.localStorage.getItem('theme') as
        | typeof defaultTheme
        | undefined) || defaultTheme
    )
  }, [defaultTheme])

  useEffect(() => {
    if (theme && window.localStorage.getItem('theme') !== theme) {
      window.localStorage.setItem('theme', theme)
    }
  }, [theme])

  return (
    <ThemeContext.Provider
      value={{
        theme: theme || defaultTheme,
        themesMap,
        setTheme,
        userPrefersDark,
        defaultTheme
      }}
      {...props}
    >
      {theme && children && <div data-theme={themesMap[theme]}>{children}</div>}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
