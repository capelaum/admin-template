import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'

interface AppProviderProps {
  children: ReactNode
}

interface AppContextData {
  theme: string
  toggleTheme: () => void
}

const AppContext = createContext<AppContextData>({} as AppContextData)

export function AppProvider({ children }: AppProviderProps) {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) setTheme(savedTheme)
  }, [])

  function toggleTheme() {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  return (
    <AppContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = (): AppContextData => useContext(AppContext)
