import { ReactNode } from 'react'
import { toast, ToastPosition } from 'react-toastify'

export const showToast = (
  message: string,
  theme: 'colored',
  position: ToastPosition = 'top-right',
  icon?: ReactNode
) => {
  toast(message, {
    position,
    theme,
    icon
  })
}

export const showToastError = (message: string, icon?: ReactNode) => {
  toast.error(message, {
    position: 'top-right',
    theme: 'colored',
    icon
  })
}
