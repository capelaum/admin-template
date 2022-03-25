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
      hover:bg-gray-100 text-gray-700
      dark:text-gray-300 dark:hover:bg-gray-700
        transition-all duration-250
      `}
      onClick={onClick}
    >
      <Link href={url ?? '#'} passHref>
        <a
          className={`flex flex-col justify-center items-center h-20 w-20 ${className} transition-all duration-250`}
        >
          {icon}
          <span className="text-xs font-light pt-2">{text}</span>
        </a>
      </Link>
    </li>
  )
}
