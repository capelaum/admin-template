import {
  IconHome,
  IconLogout,
  IconNotifications,
  IconSettings,
} from 'components/Assets/icons'
import { images } from 'components/Assets/images'
import { Item } from './Item'
import { Logo } from './Logo'

export function Sidebar() {
  return (
    <aside
      className="flex flex-col

      bg-gray-200 text-gray-700
      dark:bg-gray-900
      "
    >
      <Logo src={images.capelaum_logo} alt="Logo de Luís Vinicius Capelletto" />
      <ul className="flex-grow">
        <Item url="/" text="Home" icon={IconHome} />
        <Item url="/settings" text="Settings" icon={IconSettings} />
        <Item
          url="/notifications"
          text="Notifications"
          icon={IconNotifications}
        />
      </ul>
      <ul className="">
        <Item
          text="Sair"
          icon={IconLogout}
          onClick={() => console.log('Logout')}
          className="
          text-red-600 hover:bg-red-500 hover:text-white
          dark:text-red-500 dark:hover:bg-red-500 dark:hover:text-white
          "
        />
      </ul>
    </aside>
  )
}
