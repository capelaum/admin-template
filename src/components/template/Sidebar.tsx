import { IconHome, IconNotifications, IconSettings } from 'components/icons'
import { SidebarItem } from './SidebarItem'

export function Sidebar() {
  return (
    <aside>
      <ul>
        <SidebarItem url="/" text="Home" icon={IconHome} />
        <SidebarItem url="/settings" text="Settings" icon={IconSettings} />
        <SidebarItem
          url="/notifications"
          text="Notifications"
          icon={IconNotifications}
        />
      </ul>
    </aside>
  )
}
