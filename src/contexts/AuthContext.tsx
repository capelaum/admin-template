import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { User } from 'models/User'
import { useRouter } from 'next/router'
import { createContext, ReactNode, useContext, useState } from 'react'
import { firebaseApp } from 'services/firebase'
import { getUserFromFirebase } from 'services/users'
import { showToast, showToastError } from 'utils/toasts'

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

  const googleProvider = new GoogleAuthProvider()
  const auth = getAuth(firebaseApp)

  async function sigInWithGoogle() {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider)
      const user = await getUserFromFirebase(userCredential)
      console.log('🚀 ~ user', user)

      if (!user) {
        throw new Error('User not found')
      }

      setUser(user)
      router.push('/')
      showToast(`Welcome ${user.name}!`, 'top-right', '✅')
    } catch (err) {
      console.error(err)
      showToastError('Oops! Something went wrong.')
    }
  }

  async function signOutWithGoogle() {
    if (user) {
      const { name } = user
      showToast(`Bye ${name}`, 'top-right', '👋')
    }
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
