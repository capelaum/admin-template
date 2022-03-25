import { createContext, ReactNode, useContext } from 'react'

interface AppProviderProps {
  children: ReactNode
}

interface AppContextData {
  name: string
}

const AppContext = createContext<AppContextData>({} as AppContextData)

export function AppProvider({ children }: AppProviderProps) {
  return (
    <AppContext.Provider value={{ name: 'My Name is Luis' }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = (): AppContextData => useContext(AppContext)
