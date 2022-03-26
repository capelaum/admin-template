export interface User {
  uid: string
  email: string | null
  name: string | null
  token: string
  authProvider: string
  photoURL: string | null
}
