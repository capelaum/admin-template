import { UserCredential } from 'firebase/auth'
import { User } from 'models/User'

export async function getUserFromFirebase(
  userCredential: UserCredential
): Promise<User | undefined> {
  const { user } = userCredential
  const token = await user.getIdToken()

  const { uid, displayName, email, providerData, photoURL } = user
  console.log('🚀 ~ user providerData', providerData)

  if (!token) return

  return {
    uid,
    email,
    name: displayName,
    token,
    authProvider: providerData[0].providerId,
    photoURL
  }
}
