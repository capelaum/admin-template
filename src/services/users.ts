import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier'
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

export async function getDecodedToken(
  userToken: string
): Promise<DecodedIdToken | null> {
  const decodedToken: DecodedIdToken = await fetch(
    'http://localhost:3000/api/verifyIdToken',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userToken })
    }
  ).then((res) => res.json())

  if (decodedToken.error) {
    return null
  }

  return decodedToken
}
