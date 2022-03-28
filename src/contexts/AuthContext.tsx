import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier'
import { FirebaseError } from 'firebase/app'
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
  getUserFromUserCredential
} from 'services/users'
import { showToastError, showToastSuccess } from 'utils/toasts'

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
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [authLoading, setAuthLoading] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  const setUserByCookies = useCallback(async () => {
    const { userToken } = parseCookies()
    setAuthLoading(true)

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

    setAuthLoading(false)
  }, [])

  useEffect(() => {
    setUserByCookies()
  }, [setUserByCookies])

  async function setUserFromUserCredential(userCredential: UserCredential) {
    const user = await getUserFromUserCredential(userCredential)

    if (!user) {
      throw new Error('User not found')
    }

    setUser(user)

    setCookie(null, 'userToken', user.token, {
      maxAge: 7 * 24 * 60 * 60
    })

    return user
  }

  function showFirebaseError(error: unknown) {
    // console.error('ERROR:', error)

    if (error instanceof FirebaseError) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          showToastError('This email is already in use')
          break
        case 'auth/invalid-email':
          showToastError('This email is invalid')
          break
        case 'auth/weak-password':
          showToastError('This password is too weak')
          break
        case 'auth/wrong-password':
          showToastError('Wrong password')
          break
        default:
          showToastError(error.message)
      }
    } else {
      showToastError('Something went wrong')
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )

      const user = await setUserFromUserCredential(userCredential)

      router.push('/')
      showToastSuccess(`Welcome ${user.name}!`)
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

      const toastMessage = `${user.name}, your account has been created successfully!`
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
    <AuthContext.Provider
      value={{
        user,
        signIn,
        register,
        sigInWithGoogle,
        signOut,
        authLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextData => useContext(AuthContext)
