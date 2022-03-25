import Link from 'next/link'
import { ReactNode } from 'react'

interface SidebarItemProps {
  text: string
  icon: ReactNode
  url?: string
  onClick?: (e: any) => void
  className?: string
}

export function SidebarItem({
  text,
  icon,
  url,
  onClick,
  className,
}: SidebarItemProps) {
  return (
    <li
      className={`hover:bg-gray-100 text-gray-600 ${className}`}
      onClick={onClick}
    >
      <Link href={url ?? '#'} passHref>
        <a className="flex flex-col justify-center items-center h-20 w-20">
          {icon}
          <span className="text-xs font-light">{text}</span>
        </a>
      </Link>
    </li>
  )
}
