import { AppProvider } from 'contexts/AppContext'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <AppProvider>
        <Component {...pageProps} />
        <ToastContainer />
      </AppProvider>
    </>
  )
}

export default MyApp
