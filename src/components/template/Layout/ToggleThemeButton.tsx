import { IconDark, IconLight } from 'components/Assets/icons'
import { useApp } from 'contexts/AppContext'

export function ToggleThemeButton() {
  const { theme, toggleTheme } = useApp()

  return (
    <button
      onClick={toggleTheme}
      className="
        flex items-center justify-center
        w-8 h-8 sm:w-10 sm:h-10
        rounded-full
        transition-all duration-300
        text-gray-700 bg-gray-100 hover:bg-gray-700 hover:text-gray-400
        dark:text-gray-400 dark:bg-gray-900 dark:hover:text-gray-700 dark:hover:bg-gray-100
        drop-shadow-md

        "
      title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
    >
      {theme === 'dark' ? IconLight : IconDark}
    </button>
  )
}
