import { ReactNode } from 'react'
import { toast, ToastPosition } from 'react-toastify'

export const showToast = (
  message: string,
  position: ToastPosition = 'top-right',
  icon?: ReactNode
) => {
  toast.success(message, {
    position,
    icon,
  })
}

export const showToastError = (message: string, icon?: ReactNode) => {
  toast.error(message, {
    position: 'top-right',
    theme: 'colored',
    icon,
  })
}
