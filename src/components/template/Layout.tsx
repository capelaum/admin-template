import { useApp } from 'contexts/AppContext'
import { useAuth } from 'contexts/AuthContext'
import { ReactNode } from 'react'
import { Oval } from 'react-loader-spinner'
import { Content } from './Content'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

interface LayoutProps {
  title: string
  subtitle: string
  children?: ReactNode
}

export function Layout({ title, subtitle, children }: LayoutProps) {
  const { theme } = useApp()
  const { authLoading } = useAuth()

  function renderContent() {
    return (
      <>
        <Header title={title} subtitle={subtitle} />
        <Content>{children}</Content>
      </>
    )
  }

  function renderLoading() {
    return (
      <div className={`${theme} h-screen flex items-center justify-center`}>
        <Oval
          color="#00BFFF"
          secondaryColor="none"
          height={100}
          width={100}
          ariaLabel="Loading..."
        />
      </div>
    )
  }

  function handleRender() {
    if (authLoading) return renderLoading()

    return renderContent()
  }

  return (
    <div className={`${theme} flex h-screen w-screen `}>
      <Sidebar />
      <div
        className="
          flex flex-col flex-grow
          bg-gray-300
          p-4 sm:p-7
          dark:bg-gray-800
        "
      >
        {handleRender()}
      </div>
    </div>
  )
}
