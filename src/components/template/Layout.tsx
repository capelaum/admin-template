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
    <div>
      <Sidebar />
      <Header title={title} subtitle={subtitle} />
      <Content>{children}</Content>
    </div>
  )
}
