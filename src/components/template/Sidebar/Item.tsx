import Link from 'next/link'
import { ReactNode } from 'react'

interface SidebarItemProps {
  text: string
  icon: ReactNode
  url?: string
  onClick?: (e: any) => void
  className?: string
}

export function Item({
  text,
  icon,
  url,
  onClick,
  className,
}: SidebarItemProps) {
  return (
    <li
      className={`
      hover:bg-gray-100 text-gray-600
      dark:text-gray-400 dark:hover:bg-gray-800
      transition-all duration-250
      ${className}
      `}
      onClick={onClick}
    >
      <Link href={url ?? '#'} passHref>
        <a className="flex flex-col justify-center items-center h-20 w-20">
          {icon}
          <span className="text-xs font-light pt-2">{text}</span>
        </a>
      </Link>
    </li>
  )
}
