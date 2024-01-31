import { createContext, FC, PropsWithChildren, useEffect, useState } from 'react'

import { applyTheme } from '@/themes/utils'

export interface UserContextProps {
  theme: string
  toggleTheme: (theme: string) => void
}

export const ThemeContext = createContext<UserContextProps>({
  theme: 'dark',
  toggleTheme: (theme: string) => {}
})

const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<string>('dark')

  const toggleTheme = (theme: string) => {
    setTheme(theme)
    applyTheme(theme)
  }

  useEffect(() => {
    toggleTheme('dark')
  }, [])

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export default ThemeProvider
