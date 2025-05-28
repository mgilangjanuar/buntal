import { createContext, useContext, useEffect, useState } from 'react'

type Theme = {
  theme: 'light' | 'dark'
  themesMap?: { [key in 'light' | 'dark']: string }
  setTheme: (theme: 'light' | 'dark') => void
}

const ThemeContext = createContext<Theme>({
  theme: 'light',
  setTheme: () => {}
})

type ThemeProviderProps = {
  defaultTheme?: 'light' | 'dark'
  themesMap?: { [key in 'light' | 'dark']: string }
  children?: React.ReactNode
}

export function ThemeProvider({
  defaultTheme = 'light',
  themesMap = undefined,
  children,
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>()

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
        setTheme
      }}
      {...props}
    >
      <div data-theme={theme && themesMap?.[theme]}>{children}</div>
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
