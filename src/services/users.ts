import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier'
import { FirebaseError } from 'firebase/app'
import { updateEmail, updateProfile, UserCredential } from 'firebase/auth'
import { User, UserProfile } from 'models/User'
import { showToastError, showToastSuccess } from 'utils/toasts'
import { auth } from './firebase'

export async function getUserFromUserCredential(
  userCredential: UserCredential
): Promise<User | undefined> {
  const { user } = userCredential
  const token = await user.getIdToken()

  const { uid, displayName: name, email, photoURL, providerId: provider } = user

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
  if (!userToken) return null

  try {
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

    if (decodedToken.error) return null

    return decodedToken
  } catch (error) {
    console.error('getDecodedToken CATCH ERROR', error)
    return null
  }
}

export function showFirebaseError(error: unknown) {
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
      case 'auth/requires-recent-login':
        showToastError('You need to login again')
        break
      default:
        showToastError(error.message)
    }
  } else {
    showToastError('Something went wrong')
  }
}

export async function updateUserProfile(user: UserProfile) {
  try {
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, user)

      showToastSuccess('Profile updated successfully')
    }
  } catch (error) {
    showFirebaseError(error)
  }
}

export async function updateUserEmail(updatedEmail: string) {
  try {
    if (auth.currentUser) {
      await updateEmail(auth.currentUser, updatedEmail)

      showToastSuccess('Email updated')
    }
  } catch (error) {
    showFirebaseError(error)
  }
}
