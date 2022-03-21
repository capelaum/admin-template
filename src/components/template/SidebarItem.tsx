import Link from 'next/link'
import { ReactNode } from 'react'

interface SidebarItemProps {
  url: string
  text: string
  icon: ReactNode
}

export function SidebarItem({ url, text, icon }: SidebarItemProps) {
  return (
    <li className="hover:bg-gray-100 ">
      <Link href={url} passHref>
        <a className="flex flex-col justify-center items-center h-20 w-20">
          {icon}
          <span className="text-xs font-light text-gray-600">{text}</span>
        </a>
      </Link>
    </li>
  )
}
