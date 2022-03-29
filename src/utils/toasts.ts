import { ReactNode } from 'react'
import { Theme, toast, ToastPosition } from 'react-toastify'

export const showToast = (
  message: string,
  position: ToastPosition = 'top-right',
  icon?: ReactNode
) => {
  toast(message, {
    position,
    icon
  })
}

export const showToastSuccess = (
  message: string,
  theme: Theme | undefined = 'colored',
  position: ToastPosition = 'bottom-right',
  icon?: ReactNode
) => {
  toast.success(message, {
    position,
    theme,
    icon
  })
}

export const showToastError = (
  message: string,
  theme: Theme | undefined = 'colored',
  position: ToastPosition = 'top-right',
  icon?: ReactNode
) => {
  toast.error(message, {
    position,
    theme,
    icon
  })
}
