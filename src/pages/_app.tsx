import { AppProvider } from 'contexts/AppContext'
import { AuthProvider } from 'contexts/AuthContext'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthProvider>
        <AppProvider>
          <Component {...pageProps} />
          <ToastContainer />
        </AppProvider>
      </AuthProvider>
    </>
  )
}

export default MyApp
