import { ReactNode } from 'react'
import { Content } from './Content'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

interface LayoutProps {
  title: string
  subtitle: string
  children?: ReactNode
}

export function Layout({ title, subtitle, children }: LayoutProps) {
  return (
    <div className="dark flex h-screen w-screen ">
      <Sidebar />
      <div
        className="
          flex flex-col flex-grow
          bg-gray-300
          p-7
          dark:bg-gray-800
        "
      >
        <Header title={title} subtitle={subtitle} />
        <Content>{children}</Content>
      </div>
    </div>
  )
}
