import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier'
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  UserCredential
} from 'firebase/auth'
import { User } from 'models/User'
import { useRouter } from 'next/router'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'
import { auth } from 'services/firebase'
import {
  getDecodedToken,
  getUserFromDecodedToken,
  getUserFromUserCredential,
  showFirebaseError
} from 'services/users'
import { showToast, showToastSuccess } from 'utils/toasts'

interface AuthProviderProps {
  children: ReactNode
}

interface AuthContextData {
  user: User | null
  sigInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  register: (email: string, password: string) => Promise<void>
  authLoading: boolean
  setUserByCookies: () => void
  setUser: Dispatch<SetStateAction<User | null>>
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [authLoading, setAuthLoading] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  const setUserByCookies = useCallback(async (): Promise<void | null> => {
    const { userToken } = parseCookies()
    // setAuthLoading(true)

    if (!userToken) return null

    const decodedToken: DecodedIdToken | null = await getDecodedToken(userToken)

    if (!decodedToken) return null

    if (decodedToken) {
      const userFromDecodedToken = getUserFromDecodedToken(
        decodedToken,
        userToken
      )

      setUser(userFromDecodedToken)
    }

    // setAuthLoading(false)
  }, [])

  useEffect(() => {
    setUserByCookies()
  }, [setUserByCookies])

  async function setUserFromUserCredential(userCredential: UserCredential) {
    const user = await getUserFromUserCredential(userCredential)

    if (!user) throw new Error('User not found')

    setUser(user)

    setCookie(null, 'userToken', user.token, {
      maxAge: 7 * 24 * 60 * 60
    })

    return user
  }

  async function signIn(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )

      await setUserFromUserCredential(userCredential)

      router.push('/')
      showToastSuccess(`Welcome!`)
    } catch (error) {
      showFirebaseError(error)
    }
  }

  async function register(email: string, password: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      const user = await setUserFromUserCredential(userCredential)

      router.push('/')

      const toastMessage = user.name
        ? `${user.name}, your account has been created successfully!`
        : 'Your account has been created successfully!'

      showToastSuccess(toastMessage)
    } catch (error) {
      showFirebaseError(error)
    }
  }

  async function sigInWithGoogle() {
    try {
      const googleProvider = new GoogleAuthProvider()
      const userCredential = await signInWithPopup(auth, googleProvider)
      const user = await setUserFromUserCredential(userCredential)

      router.push('/')
      showToastSuccess(`Welcome ${user.name}!`)
    } catch (error) {
      showFirebaseError(error)
    }
  }

  async function signOut() {
    destroyCookie(null, 'userToken')
    setUser(null)
    await auth.signOut()
    router.push('/login')
    showToast(`Bye ${user?.name ?? ''}!`)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        signIn,
        register,
        sigInWithGoogle,
        signOut,
        authLoading,
        setUserByCookies
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextData => useContext(AuthContext)
