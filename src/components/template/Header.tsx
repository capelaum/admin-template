import { Avatar } from './Avatar'
import { Title } from './Title'
import { ToggleThemeButton } from './ToggleThemeButton'

interface HeaderProps {
  title: string
  subtitle: string
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <div className="flex justify-between items-start  ">
      <Title title={title} subtitle={subtitle} />
      <div className="flex items-center justify-center gap-4 ">
        <Avatar />
        <ToggleThemeButton />
      </div>
    </div>
  )
}
