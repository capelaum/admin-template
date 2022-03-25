import { ReactNode } from 'react'

interface ButtonProps {
  submit: () => void
  children: ReactNode
  variant: string
}

export function Button({ submit, children, variant }: ButtonProps) {
  const googleButtonStyles = `
    from-gray-100 to-gray-100 text-indigo-700
    border border-indigo-400
    hover:bg-gray-200 hover:text-indigo-900
    hover:to-purple-600 hover:from-blue-700 hover:text-gray-50
  `

  const gradient =
    variant === 'blue'
      ? 'from-purple-600 to-blue-700 text-white'
      : googleButtonStyles

  return (
    <button
      onClick={submit}
      className={`
          w-full
          flex items-center justify-center
          bg-gradient-to-br hover:bg-gradient-to-bl
          focus:ring-2 focus:outline-none focus:ring-blue-300
          dark:focus:ring-blue-800
          font-medium rounded-lg
          mr-2 mb-4
          px-5 py-2.5
          text-sm sm:text-lg text-center
          transition-all duration-300
          ${gradient}
        `}
    >
      {children}
    </button>
  )
}
