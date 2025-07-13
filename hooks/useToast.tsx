import { useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import Toast from 'components/Toast'

type ToastType = 'success' | 'error' | 'info'

export const useToast = () => {
  const [toasts, setToasts] = useState<{ id: number; message: string; type: ToastType }[]>([])

  const showToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])
  }, [])

  const removeToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

  const ToastContainer = () => {
    if (typeof window === 'undefined') return null

    return createPortal(
      <>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </>,
      document.body
    )
  }

  return {
    showToast,
    ToastContainer
  }
}