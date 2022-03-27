import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { User } from 'models/User'
import { useRouter } from 'next/router'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'
import { toast } from 'react-toastify'
import { auth } from 'services/firebase'
import {
  getDecodedToken,
  getUserFromDecodedToken,
  getUserFromFirebase
} from 'services/users'
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

  const setUserByCookies = useCallback(async () => {
    const { userToken } = parseCookies()

    if (!userToken) return

    const decodedToken: DecodedIdToken | null = await getDecodedToken(userToken)

    if (!decodedToken) return

    if (decodedToken) {
      const userFromDecodedToken = getUserFromDecodedToken(
        decodedToken,
        userToken
      )

      setUser(userFromDecodedToken)
    }
  }, [])

  useEffect(() => {
    setUserByCookies()
  }, [setUserByCookies])

  async function sigInWithGoogle() {
    try {
      const googleProvider = new GoogleAuthProvider()
      const userCredential = await signInWithPopup(auth, googleProvider)
      const user = await getUserFromFirebase(userCredential)

      if (!user) {
        throw new Error('User not found')
      }

      setUser(user)

      setCookie(null, 'userToken', user.token, {
        maxAge: 7 * 24 * 60 * 60
      })

      router.push('/')
      toast.success(`Welcome ${user.name}!`, {
        position: 'bottom-right',
        theme: 'colored'
      })
    } catch (err) {
      console.error(err)
      showToastError('Oops! Something went wrong.')
    }
  }

  async function signOutWithGoogle() {
    if (user) {
      toast(`Bye ${user.name}!`, {
        theme: 'light',
        icon: '👋'
      })
    }

    destroyCookie(null, 'userToken')

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
