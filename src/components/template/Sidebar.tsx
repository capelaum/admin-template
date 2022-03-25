import capelaum_logo from '@public/capelaum_logo.png'
import {
  IconHome,
  IconLogout,
  IconNotifications,
  IconSettings,
} from 'components/icons'
import { Logo } from './Logo'
import { SidebarItem } from './SidebarItem'

export function Sidebar() {
  return (
    <aside className="flex flex-col">
      <div
        className="
          w-20 h-20
          flex flex-col items-center justify-center
        "
      >
        <Logo src={capelaum_logo} alt="Logo de Luís Vinicius Capelletto" />
      </div>
      <ul className="flex-grow">
        <SidebarItem url="/" text="Home" icon={IconHome} />
        <SidebarItem url="/settings" text="Settings" icon={IconSettings} />
        <SidebarItem
          url="/notifications"
          text="Notifications"
          icon={IconNotifications}
        />
      </ul>
      <ul className="">
        <SidebarItem
          text="Sair"
          icon={IconLogout}
          onClick={() => console.log('Logout')}
          className="text-red-600 hover:bg-red-400 hover:text-white transition-all duration-250"
        />
      </ul>
    </aside>
  )
}
