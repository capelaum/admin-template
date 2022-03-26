import { UserCredential } from 'firebase/auth'
import { User } from 'models/User'

export async function getUserFromFirebase(
  userCredential: UserCredential
): Promise<User | undefined> {
  const { user, providerId: provider } = userCredential
  const token = await user.getIdToken()

  const { uid, displayName: name, email, photoURL } = user

  if (!token) return

  return {
    uid,
    email,
    token,
    photoURL,
    name,
    provider
  }
}
