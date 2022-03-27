import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { User } from 'models/User'
import { useRouter } from 'next/router'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import { createContext, ReactNode, useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { auth } from 'services/firebase'
import { getUserFromFirebase } from 'services/users'
import { showToastError } from 'utils/toasts'

interface AuthProviderProps {
  children: ReactNode
}

interface AuthContextData {
  user: User | null
  sigInWithGoogle: () => Promise<void>
  signOutWithGoogle: () => Promise<void>
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  async function sigInWithGoogle() {
    try {
      const googleProvider = new GoogleAuthProvider()
      const userCredential = await signInWithPopup(auth, googleProvider)
      const user = await getUserFromFirebase(userCredential)
      console.log('🚀 ~ user', user)

      if (!user) {
        throw new Error('User not found')
      }

      setUser(user)

      setCookie(null, 'userToken', user.token, {
        maxAge: 7 * 24 * 60 * 60
      })

      const cookies = parseCookies()
      console.log(cookies)

      console.log('🚀 ~ auth', auth)

      router.push('/')
      toast.success(`Welcome ${user.name}!`, {
        theme: 'colored'
      })
    } catch (err) {
      console.error(err)
      showToastError('Oops! Something went wrong.')
    }
  }

  async function signOutWithGoogle() {
    if (user) {
      toast(`Goodbye ${user.name}!`, {
        theme: 'colored',
        icon: '👋'
      })
    }

    destroyCookie(null, 'userToken')
    const cookies = parseCookies()
    console.log(cookies)

    setUser(null)

    await auth.signOut()

    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ user, sigInWithGoogle, signOutWithGoogle }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextData => useContext(AuthContext)
