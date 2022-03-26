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
  user: User
  sigInWithGoogle: () => Promise<void>
  signOutWithGoogle: () => Promise<void>
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User)
  const router = useRouter()

  const googleProvider = new GoogleAuthProvider()
  const auth = getAuth(firebaseApp)

  async function sigInWithGoogle() {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const user = await getUserFromFirebase(result)
      console.log('🚀 ~ user', user)

      if (!user) {
        throw new Error('User not found')
      }

      setUser(user)
      showToast(`Welcome ${user.name}!`, 'top-right')
      router.push('/')
    } catch (err) {
      console.error(err)
      showToastError('Oops! Something went wrong.')
    }
  }

  async function signOutWithGoogle() {}

  return (
    <AuthContext.Provider value={{ user, sigInWithGoogle, signOutWithGoogle }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextData => useContext(AuthContext)
