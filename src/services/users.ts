import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier'
import { UserCredential } from 'firebase/auth'
import { User } from 'models/User'

export async function getUserFromUserCredential(
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

export function getUserFromDecodedToken(
  decodedToken: DecodedIdToken,
  userToken: string
): User {
  const {
    uid,
    name,
    email,
    picture: photoURL,
    firebase: { sign_in_provider: provider }
  } = decodedToken

  return {
    uid,
    email,
    name,
    photoURL,
    token: userToken,
    provider
  }
}

export async function getDecodedToken(
  userToken: string
): Promise<DecodedIdToken | null> {
  const baseUrl =
    process.env.ENV === 'production'
      ? process.env.NEXT_PUBLIC_BASE_URL_PROD
      : process.env.NEXT_PUBLIC_BASE_URL_DEV

  const decodedToken: DecodedIdToken = await fetch(
    `${baseUrl}/api/verifyIdToken`,
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
