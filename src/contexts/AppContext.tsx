import { createContext, ReactNode, useContext, useState } from 'react'

interface AppProviderProps {
  children: ReactNode
}

type Theme = 'dark' | 'light'

interface AppContextData {
  theme: Theme
  toggleTheme: () => void
}

const AppContext = createContext<AppContextData>({} as AppContextData)

export function AppProvider({ children }: AppProviderProps) {
  const [theme, setTheme] = useState<Theme>('dark')

  function toggleTheme() {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <AppContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = (): AppContextData => useContext(AppContext)
